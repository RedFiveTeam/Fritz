import { UploadRepository } from './repositories/UploadRepository';
import { Repositories } from '../../../utils/Repositories';
import { action } from 'mobx';
import { UploadStore } from './UploadStore';
import { Stores } from '../../../utils/Stores';
import { StatusModel } from './StatusModel';

export class UploadActions {
  private uploadRepository: UploadRepository;
  private uploadStore: UploadStore;
  private poll: any;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.uploadRepository = repositories.uploadRepository!;
    this.uploadStore = stores.uploadStore!;
  }

  @action.bound
  async upload(file: object) {
    const resp = await this.uploadRepository.upload(file);
    this.uploadStore.setUploaded(true);
    this.uploadStore.setFileName(resp.file);
    this.uploadStore.setProcessing(true);
    this.poll = setInterval(
      async () => { await this.checkStatus(); },
      1000);
  }

  async checkStatus() {
    console.log('checking status');
    this.uploadRepository.status()
      .then((status: StatusModel) => {
        if (status.status === 'complete') {
          this.uploadProcessingComplete();
        }
      });
    return;
  }

  uploadProcessingComplete() {
    clearInterval(this.poll);
    this.uploadStore.setProcessing(false);
  }
}