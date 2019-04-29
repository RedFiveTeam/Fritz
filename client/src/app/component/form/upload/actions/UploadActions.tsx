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

export class UploadActions {
  public metricActions: MetricActions;

  private slidesActions: SlidesActions;
  private uploadRepository: UploadRepository;
  private uploadStore: UploadStore;
  private slidesStore: SlidesStore;
  private poll: any;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.uploadRepository = repositories.uploadRepository!;
    this.uploadStore = stores.uploadStore!;
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
            console.log(status.date);
            this.slidesActions.setAndUpdateDate(
              status.date.substr(2, 3),
              status.date.substr(-2),
              status.date.substr(0, 2)
            );
            this.setDateInput(status.date);
          }
        }
      });
    return;
  }

  setDateInput(date: string) {
    let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let monthStr = date.substr(2, 3);
    console.log(monthStr);
    let monthInt = ('0' + (months.indexOf(monthStr) + 1)).slice(-2);
    console.log(monthInt);
    let day = date.substr(0, 2);
    let year = date.substr(-2);
    let dateInput = document.querySelector('#dateInput') as HTMLInputElement;
    if (dateInput) {
      dateInput.value = '20' + year + '-' + monthInt + '-' + day;
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