import { Stores } from '../../../../utils/Stores';
import { SlidesStore } from '../SlidesStore';
import { UploadStore } from '../../form/upload/UploadStore';
import { SlideModel } from '../SlideModel';
import * as FileSaver from 'file-saver';
import { MetricActions } from '../../metrics/actions/MetricActions';
import { action } from 'mobx';
import { Repositories } from '../../../../utils/Repositories';

export class SlidesActions {
  public metricActions: MetricActions;

  private slidesStore: SlidesStore;
  private uploadStore: UploadStore;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.slidesStore = stores.slidesStore!;
    this.uploadStore = stores.uploadStore!;
    this.metricActions = new MetricActions(repositories, stores);
  }

  @action.bound
  setAndUpdateActivity(slide: SlideModel, activity: string) {
    if (activity === '') {
      activity = 'ACTY';
    }
    this.slidesStore.setActivity(slide, activity);
    this.updateNewNames();
  }

  @action.bound
  setAndUpdateTime(slide: SlideModel, time: string) {
    if (time === '') {
      time = 'TTTT';
    }
    this.slidesStore.setTime(slide, time);
    this.updateNewNames();
  }

  @action.bound
  setAndUpdateDate(month: string | null, year: string | null, day: string | null) {
    if (month == null) {
      month = 'MON';
    }
    if (year == null) {
      year = 'YY';
    }
    if (day == null) {
      day = 'DD';
    }

    this.slidesStore.setMonth(month);
    this.slidesStore.setYear(year);
    this.slidesStore.setDay(day);
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
      this.slidesStore.setActivity(this.slidesStore.slides[i], slide.activity);
      this.slidesStore.setTime(this.slidesStore.slides[i], slide.time);
      newName = this.slidesStore.nameFormat + (i + 1);
      this.slidesStore.slides[i].setNewName(newName);
    }
  }

  updateOldNames() {
    this.slidesStore.slides.map((s: SlideModel) => {
      s.setOldName(s.newName);
    });
  }

  async trackRenameAndDownload() {
    await this.metricActions.trackMetric('Download');
    let request = new XMLHttpRequest();
    request.onreadystatechange = async () => {
      if (request.readyState === 4) {
        this.updateOldNames();
        await this.metricActions.updateMetric('Download');
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