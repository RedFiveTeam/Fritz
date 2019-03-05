import { UploadRepository } from './repositories/UploadRepository';
import { Repositories } from '../../../utils/Repositories';
import { action } from 'mobx';
import { UploadStore } from './UploadStore';
import { Stores } from '../../../utils/Stores';
import { StatusModel } from './StatusModel';
import { SlidesStore } from '../slides/SlidesStore';
import { SlideModel } from '../slides/SlideModel';
import { SlidesActions } from '../slides/SlidesActions';
import { MetricRepository } from '../metrics/MetricRepository';
import { MetricModel } from '../metrics/MetricModel';

export class UploadActions {
  private slidesActions: SlidesActions;
  private uploadRepository: UploadRepository;
  private metricRepository: MetricRepository;
  private uploadStore: UploadStore;
  private slidesStore: SlidesStore;
  private poll: any;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.uploadRepository = repositories.uploadRepository!;
    this.metricRepository = repositories.metricRepository!;
    this.uploadStore = stores.uploadStore!;
    this.slidesStore = stores.slidesStore!;
    this.slidesActions = new SlidesActions(repositories, stores);
  }

  @action.bound
  async upload(file: object) {
    let metric = new MetricModel(null, '', 'Upload', Math.round((Date.now() / 1000)).toString(), null);
    metric = await this.metricRepository.create(metric);
    const resp = await this.uploadRepository.upload(file);
    metric.setEndTime(Math.round((Date.now() / 1000)).toString());
    metric.setUid(resp.hash);
    await this.metricRepository.update(metric);
    this.uploadStore.setUploaded(true);
    this.uploadStore.setFileName(resp.file);
    this.uploadStore.setProcessing(true);
    this.poll = setInterval(
      async () => { await this.checkStatus(); },
      1000);
  }

  @action.bound
  async checkStatus() {
    this.uploadRepository.status()
      .then((status: StatusModel) => {
        if (status.status === 'complete') {
          this.uploadProcessingComplete();
          this.slidesStore.setFiles(status.files);
          this.setSlides(status.files);
        }
      });
    return;
  }

  @action.bound
  setSlides(names: string[]) {
    let temp: SlideModel[] = [];
    names.map((name) => {
      let slide = new SlideModel();
      slide.setOldName(name);
      temp.push(slide);
    });
    this.slidesStore.setSlides(temp);
    this.slidesActions.updateNewNames();
  }

  uploadProcessingComplete() {
    clearInterval(this.poll);
    this.uploadStore.setProcessing(false);
  }

  @action.bound
  validateFile(name: string) {
    return name.toLowerCase().endsWith('.pptx') || name.toLowerCase().endsWith('.ppt');
  }
}