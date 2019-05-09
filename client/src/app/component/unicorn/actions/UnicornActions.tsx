import { UnicornStore } from '../store/UnicornStore';
import { UnicornRepository } from '../repositories/UnicornRepository';
import { Repositories } from '../../../../utils/Repositories';
import { Stores } from '../../../../utils/Stores';
import { action } from 'mobx';
import { SlideModel } from '../../slides/models/SlideModel';
import { UnicornUploadModel } from '../model/UnicornUploadModel';
import { SlidesStore } from '../../slides/store/SlidesStore';
import { MetricActions } from '../../metrics/actions/MetricActions';
import { UnicornUploadStatusModel } from '../model/UnicornUploadStatusModel';

export class UnicornActions {
  public metricActions: MetricActions;
  slidesForUpload: SlideModel[];
  private unicornStore: UnicornStore;
  private slidesStore: SlidesStore;
  private readonly unicornRepository: UnicornRepository;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.unicornStore = stores.unicornStore!;
    this.slidesStore = stores.slidesStore!;
    this.unicornRepository = repositories.unicornRepository!;
    this.metricActions = new MetricActions(repositories, stores);
  }

  @action.bound
  async initializeStores() {
    await this.unicornStore.hydrate(this.unicornRepository);
  }

  @action.bound
  async getCallouts(missionId: string) {
    this.unicornStore.setPendingCallouts(true);
    this.unicornStore.setCallouts([]);
    this.unicornStore.setCallouts(await this.unicornRepository.getCallouts(missionId));
    this.unicornStore.setPendingCallouts(false);
    this.checkForCalloutMatches();
  }

  @action.bound
  async getReleasabilities() {
    this.unicornStore.setReleasabilities(await this.unicornRepository.getReleasabilities());
  }

  async isUploadFinished() {
    if (this.slidesStore!.assignedCalloutCount === this.unicornStore!.currentUploadCount) {
      this.unicornStore!.setUploadComplete(true);
      await this.metricActions!.updateMetric('UploadToUnicorn');
      this.unicornStore!.setCurrentUploadCount(0);
    }
  }

  setUnicornModel(s: SlideModel) {
    let unicornUploadModel = new UnicornUploadModel();
    unicornUploadModel.setFileName(s.oldName);
    unicornUploadModel.setEndFilePath('\\Mission\\' + this.unicornStore.activeMission!.id);
    unicornUploadModel.setProductName(s.oldName);
    unicornUploadModel.setClassificationId('a8b17b94-f23a-41a1-822f-96c7ce642006');
    unicornUploadModel.setTargetEventId(s.targetEventId);
    this.setReleasabilityId(this.unicornStore!.releasability);
    unicornUploadModel.setReleasabilityId(this.unicornStore!.releasabilityId);
    unicornUploadModel.setMissionId(this.unicornStore.activeMission!.id);
    unicornUploadModel.setPersonnelId('2a7081f8-7cc9-45f3-a29e-f94a0003b3fe');
    unicornUploadModel.setIsrRoleId('');
    return unicornUploadModel;
  }

  async buildUploadModel(slide: SlideModel) {
    slide.setUploading(true);
    slide.setFailed(false);
    for (let i = 0; i < 3; i++) {
      let status: UnicornUploadStatusModel = await this.unicornRepository.upload(
        this.setUnicornModel(slide)
      );
      if (status.successfulUpload) {
        this.increaseCurrentUploadCount();
        slide.setUploading(false);
        break;
      }
      if (i === 2 && !status.successfulUpload) {
        slide.setFailed(true);
        this.metricActions!.createMetric('Upload to Unicorn Failed');
        slide.setUploading(null);
      }
    }
    this.isUploadFinished();
  }

  closeUploadModal() {
    this.unicornStore.setPendingUpload(false);
    this.unicornStore.setUploadComplete(false);
    this.unicornStore.setUnassignedCallouts(false);
    this.slidesStore.setAssignedCalloutCount(0);
  }

  @action.bound
  setReleasabilityId(rel: string) {
    const releasabilities = this.unicornStore!.releasabilities;
    for (let i = 0; i < releasabilities.length; i++) {
      if (rel === releasabilities[i].releasabilityName) {
        return this.unicornStore!.setReleasabilityId(releasabilities[i].releasabilityId);
      }
    }
    return rel;
  }

  increaseCurrentUploadCount = () => {
    this.unicornStore!.setCurrentUploadCount(this.unicornStore!.currentUploadCount + 1);
  };

  uploadToUnicorn = async () => {
    this.slidesStore.initialValidation();
    if (this.slidesStore.validate()) {
      this.renderUploadModal();
    }
  };

  filterSlides(slides: SlideModel[]): SlideModel[] {
    return slides.filter((s: SlideModel) => {
      if (s.deleted) {
        this.metricActions!.createMetric('Delete JPG');
      }
      return s.targetEventId !== '' && s.deleted !== true;
    });
  }

  renderUploadModal() {
    this.unicornStore.setPendingUpload(true);
    this.checkForUnassignedCallouts();
  }

  async startUploading() {
    if (!this.unicornStore.uploadsInProgress) {
      while (this.unicornStore.uploadQueue.length > 0) {
        this.unicornStore.setUploadsInProgress(true);
        await this.buildUploadModel(this.unicornStore.uploadQueue[0]);
        this.unicornStore.uploadQueue.shift();
      }
      this.unicornStore.setUploadsInProgress(false);
    }
  }

  @action.bound
  checkForUnassignedCallouts() {
    let slides = this.slidesStore.slides;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].targetEventId === '') {
        this.unicornStore!.setUnassignedCallouts(true);
        break;
      } else {
        this.unicornStore!.setUnassignedCallouts(false);
      }
    }
  }

  @action.bound
  async confirmUpload() {
    this.unicornStore.setPendingUpload(false);
    this.slidesForUpload = this.filterSlides(this.slidesStore.slides);
    this.unicornStore.setIsUploading(true);
    await this.metricActions.trackMetric('UploadToUnicorn');
    await this.metricActions.updateMetric('Renaming');

    for (let i = 0; i < this.slidesForUpload.length; i++) {
      await this.unicornStore.addToUploadQueue(this.slidesForUpload[i]);
    }

    await this.startUploading();
    this.unicornStore.setUploadComplete(true);
  }

  checkForCalloutMatches() {
    for (let i = 0; i < this.slidesStore.slides.length; i++) {
      let slide = this.slidesStore.slides[i];
      for (let o = 0; o < this.unicornStore.callouts.length; o++) {
        let callout = this.unicornStore.callouts[o];
        if (callout.time && callout.time.toString().indexOf(slide.time) > -1) {
          let calloutMatches = this.unicornStore.callouts.filter((f) => {
            if (f.time && f.time.length > 0) {
              return f.time.indexOf(this.slidesStore.slides[i].time) > -1;
            }
            return false;
          });
          let timeMatches = this.slidesStore.slides.filter((s) => {
            if (s.time && s.time.length) {
              let calloutTime = callout.time.toString().replace('Z', '');
              return s.time.indexOf(calloutTime) > -1;
            }
            return false;
          });
          if (timeMatches.length < 2 && calloutMatches.length < 2) {
            slide.setTargetEventId(callout.eventId);
            slide.setCalloutTime(callout.time);
          }
        }
      }
    }
  }
}