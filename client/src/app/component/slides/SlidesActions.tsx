import { Stores } from '../../../utils/Stores';
import { SlidesStore } from './SlidesStore';
import { action } from 'mobx';
import { Repositories } from '../../../utils/Repositories';
import { RenameRepository } from '../form/repositories/RenameRepository';
import { UploadStore } from '../form/UploadStore';

export class SlidesActions {

  private slidesStore: SlidesStore;
  private uploadStore: UploadStore;
  private renameRepository: RenameRepository;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.slidesStore = stores.slidesStore!;
    this.uploadStore = stores.uploadStore!;
    this.renameRepository = repositories.renameRepository!;
  }

  @action.bound
  setAndUpdateDate(date: string | null) {
    this.slidesStore.setDate(date);
    this.updateNewNames();
  }

  @action.bound
  setAndUpdateOpName(name: string) {
    this.slidesStore.setOpName(name);
    this.updateNewNames();
  }

  @action.bound
  setAndUpdateAsset(name: string) {
    this.slidesStore.setAsset(name);
    this.updateNewNames();
  }

  @action.bound
  setAndUpdateClassification(classification: string) {
    this.slidesStore.setClassification(classification);
    this.updateNewNames();
  }

  updateNewNames() {
    for (let i = 0; i < this.slidesStore.slides.length; i++) {
      let newName: string = '';
      let slide = this.slidesStore.slides[i];
      newName = this.slidesStore.nameFormat.replace('TTTT', slide.time).replace('ACTIVITY', slide.activity) + (i + 1);
      this.slidesStore.slides[i].setNewName(newName);
    }
  }

  async renameAndDownload() {
    await this.renameRepository.rename(this.slidesStore.slides, this.uploadStore.fileName);
  }

}