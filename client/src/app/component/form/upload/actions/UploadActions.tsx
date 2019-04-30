import { UploadRepository } from '../repository/UploadRepository';
import { Repositories } from '../../../../../utils/Repositories';
import { action } from 'mobx';
import { UploadStore } from '../UploadStore';
import { Stores } from '../../../../../utils/Stores';
import { StatusModel } from '../../status/StatusModel';
import { SlidesStore } from '../../../slides/SlidesStore';
import { SlideModel } from '../../../slides/SlideModel';
import { SlidesActions } from '../../../slides/actions/SlidesActions';
import { MetricActions } from '../../../metrics/actions/MetricActions';
import { UnicornStore } from '../../../unicorn/store/UnicornStore';

export class UploadActions {
  public metricActions: MetricActions;

  private slidesActions: SlidesActions;
  private uploadRepository: UploadRepository;
  private uploadStore: UploadStore;
  private unicornStore: UnicornStore;
  private slidesStore: SlidesStore;
  private poll: any;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.uploadRepository = repositories.uploadRepository!;
    this.uploadStore = stores.uploadStore!;
    this.unicornStore = stores.unicornStore!;
    this.slidesStore = stores.slidesStore!;
    this.slidesActions = new SlidesActions(repositories, stores);
    this.metricActions = new MetricActions(repositories, stores);
  }

  @action.bound
  async upload(file: object) {
    await this.metricActions.trackMetric('Upload');
    this.uploadStore.setUploading(true);
    const resp = await this.uploadRepository.upload(file);
    this.uploadStore.setHash(resp.hash);
    await this.metricActions.updateMetric('Upload');
    this.uploadStore.setUploaded(true);
    this.uploadStore.setFileName(resp.file);
    this.uploadStore.setUploading(false);
    this.uploadStore.setProcessing(true);
    this.uploadStore.setPlaceholder(false);
    this.uploadStore.setConversionStatus(true);
    await this.metricActions.trackMetric('Conversion');
    this.poll = setInterval(
      async () => { await this.checkStatus(); },
      1000
    );
  }

  @action.bound
  async checkStatus() {
    this.uploadRepository.status()
      .then((status: StatusModel) => {
        if (status.status === 'pending') {
          this.uploadStore.setTotal(status.total);
          this.uploadStore.setProgress(status.progress);
        }
        if (status.status === 'complete') {
          this.metricActions.updateMetric('Conversion');
          this.metricActions.trackMetric('Renaming');
          this.metricActions.trackConversion(status.files.length);
          this.uploadProcessingComplete();
          this.slidesStore.setFiles(status.files);
          this.setSlides(status.files, status.times);
          if (status.date && status.date !== '') {
            this.slidesActions.setAndUpdateDate(
              status.date.substr(2, 3),
              status.date.substr(-2),
              status.date.substr(0, 2)
            );
            this.setDateInput(status.date);
          }
          if (status.op && status.op !== '') {
            this.slidesActions.setAndUpdateOpName(status.op);
            this.setOpInput(status.op);
          }
          if (status.callsign && status.callsign !== '') {
            this.slidesActions.setAndUpdateAsset(status.callsign);
            this.setCallsignInput(status.callsign);
          }
        }
      });
    return;
  }

  setDateInput(date: string) {
    let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let monthStr = date.substr(2, 3);
    let monthInt = ('0' + (months.indexOf(monthStr) + 1)).slice(-2);
    let day = date.substr(0, 2);
    let year = date.substr(-2);
    let dateInput = document.querySelector('#dateInput') as HTMLInputElement;
    if (dateInput) {
      dateInput.value = '20' + year + '-' + monthInt + '-' + day;
    }
  }

  setOpInput(op: string) {
    let opInput = document.querySelector('#opInput') as HTMLInputElement;
    if (opInput) {
      opInput.value = op;
    }
  }

  setCallsignInput(callsign: string) {
    let callsignInput = document.querySelector('#assetInput') as HTMLInputElement;
    if (callsignInput) {
      callsignInput.value = callsign;
    }
  }

  @action.bound
  clearPoll() {
    clearInterval(this.poll);
  }

  @action.bound
  setSlides(names: string[], times: string[]) {
    let temp: SlideModel[] = [];
    names.map((name, idx) => {
      let slide = new SlideModel();
      if (times[idx]) {
        slide.setTime(times[idx]);
        if (this.unicornStore.callouts.length > 0) {
          for (let i = 0; i < this.unicornStore.callouts.length; i++) {
            if (this.unicornStore.callouts[i].time.toString().indexOf(times[idx]) > -1) {
              let timeMatches = times.filter((t) => {
                return t.indexOf(this.unicornStore.callouts[i].time.toString().replace('Z', '')) > -1;
              });
              let calloutMatches = this.unicornStore.callouts.filter((f) => {
                return f.time.toString().indexOf(times[idx]) > -1;
              });
              if (timeMatches.length < 2 && calloutMatches.length < 2) {
                slide.setTargetEventId(this.unicornStore.callouts[i].eventId);
              }
            }
          }
        }
      }
      slide.setId(idx);
      slide.setOldName(name);
      temp.push(slide);
    });
    this.slidesStore.setSlides(temp);
    this.slidesActions.updateNewNames();
  }

  uploadProcessingComplete() {
    clearInterval(this.poll);
    this.uploadStore.setProcessing(false);
    this.uploadStore.setConversionStatus(false);
  }
}