import { Stores } from '../../../utils/Stores';
import { SlidesStore } from './SlidesStore';
import { action } from 'mobx';
import { Repositories } from '../../../utils/Repositories';
// import { RenameRepository } from '../form/repositories/RenameRepository';
import { UploadStore } from '../form/UploadStore';
import { SlideModel } from './SlideModel';
import * as FileSaver from 'file-saver';
import { MetricRepository } from '../metrics/MetricRepository';
import { MetricModel } from '../metrics/MetricModel';

export class SlidesActions {

  private slidesStore: SlidesStore;
  private uploadStore: UploadStore;
  private metricRepository: MetricRepository;
  // private renameRepository: RenameRepository;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.slidesStore = stores.slidesStore!;
    this.uploadStore = stores.uploadStore!;
    this.metricRepository = repositories.metricRepository!;
    // this.renameRepository = repositories.renameRepository!;
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

  updateOldNames() {
    this.slidesStore.slides.map((s: SlideModel) => {
      s.setOldName(s.newName);
    });
  }

  async renameAndDownload() {
    this.trackRenameAndDownload();
    // await this.renameRepository.rename(this.slidesStore.slides, this.uploadStore.fileName);
    this.updateOldNames();
  }

  async trackRenameAndDownload() {
    let metric = new MetricModel(
      null,
      this.uploadStore.hash,
      'Download',
      Math.round((Date.now() / 1000)).toString(),
      null);
    metric = await this.metricRepository.create(metric);
    let request = new XMLHttpRequest();
    request.onreadystatechange = async () => {
      if (request.readyState === 4) {
        this.updateOldNames();
        metric.setEndTime(Math.round((Date.now() / 1000)).toString());
        await this.metricRepository.update(metric);
      }
    };
    request.withCredentials = true;
    request.open('POST', 'api/rename', true);
    request.withCredentials = true;
    request.responseType = 'blob';
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.onload = () => {
      let blob = request.response;
      FileSaver.saveAs(blob, this.uploadStore.fileName + '.zip');
    };
    request.send(JSON.stringify(this.slidesStore.slides));
  }

}