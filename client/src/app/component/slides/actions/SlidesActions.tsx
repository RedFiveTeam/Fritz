import { Stores } from '../../../../utils/Stores';
import { SlidesStore } from '../SlidesStore';
import { UploadStore } from '../../form/upload/UploadStore';
import { SlideModel } from '../SlideModel';
import * as FileSaver from 'file-saver';
import { MetricActions } from '../../metrics/actions/MetricActions';
import { action } from 'mobx';
import { Repositories } from '../../../../utils/Repositories';
import { UnicornStore } from '../../unicorn/store/UnicornStore';

export class SlidesActions {
  public metricActions: MetricActions;

  private slidesStore: SlidesStore;
  private uploadStore: UploadStore;
  private unicornStore: UnicornStore;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.slidesStore = stores.slidesStore!;
    this.uploadStore = stores.uploadStore!;
    this.unicornStore = stores.unicornStore!;
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
  setAndUpdateReleasability(releasability: string) {
    this.slidesStore.setReleasability(releasability);
    this.unicornStore.setReleasability(releasability);
    this.updateNewNames();
  }

  @action.bound
  setAndUpdateClassification(classification: string) {
    this.slidesStore.setClassification(classification);
    this.updateNewNames();
  }

  @action.bound
  deleteSlide = async (s: SlideModel) => {
    s.setDeleted(true);
  };

  updateNewNames() {
    for (let i = 0; i < this.slidesStore.slides.length; i++) {
      let newName: string = '';
      let slide = this.slidesStore.slides[i];
      this.slidesStore.setActivity(this.slidesStore.slides[i], slide.activity);
      this.slidesStore.setTime(this.slidesStore.slides[i], slide.time);
      let duplicates = this.slidesStore.slides.filter((s, idx) => {
        return s.newName.replace(/\d+\b/, '') === this.slidesStore.nameFormat && idx < i;
      }).length;
      newName = this.slidesStore.nameFormat + (duplicates > 0 ? duplicates : '');
      this.slidesStore.slides[i].setNewName(newName);
    }
  }

  updateOldNames() {
    this.slidesStore.slides.map((s: SlideModel) => {
      s.setOldName(s.newName);
    });
  }

  async trackRenameAndDownload() {
    await this.metricActions.updateMetric('Renaming');
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
      FileSaver.saveAs(blob, this.uploadStore.fileName.toUpperCase().replace('.PDF', '.zip'));
    };
    request.send(JSON.stringify(this.slidesStore.slides));
  }

  getAssignedCallouts() {
    let count: number = 0;
    for (let i = 0; i < this.slidesStore.slides.length; i++) {
      if (this.slidesStore.slides[i].targetEventId !== '' && !this.slidesStore.slides[i].deleted) {
        count++;
      } else if (this.slidesStore.slides[i].deleted) {
        this.metricActions!.createMetric('Delete JPG');
      }
    }
    this.slidesStore.setAssignedCalloutCount(count);
  }
}