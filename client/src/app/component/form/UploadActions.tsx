import { UploadRepository } from './repositories/UploadRepository';
import { Repositories } from '../../../utils/Repositories';
import { action } from 'mobx';
import { UploadStore } from './UploadStore';
import { Stores } from '../../../utils/Stores';

export class UploadActions {
  private uploadRepository: UploadRepository;
  private uploadStore: UploadStore;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.uploadRepository = repositories.uploadRepository!;
    this.uploadStore = stores.uploadStore!;
  }

  @action.bound
  async upload(file: object) {
    const resp = await this.uploadRepository.upload(file);
    this.uploadStore.setUploaded(true);
    this.uploadStore.setFileName(resp.file);
  }
}