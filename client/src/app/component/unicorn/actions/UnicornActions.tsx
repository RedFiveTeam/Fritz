import { UnicornStore } from '../store/UnicornStore';
import { UnicornRepository } from '../repositories/UnicornRepository';
import { Repositories } from '../../../../utils/Repositories';
import { Stores } from '../../../../utils/Stores';
import { action } from 'mobx';
import { SlideModel } from '../../slides/SlideModel';
import { UnicornUploadModel } from '../model/UnicornUploadModel';
import { SlidesStore } from '../../slides/SlidesStore';
import { MetricActions } from '../../metrics/actions/MetricActions';

export class UnicornActions {
  public metricActions: MetricActions;
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
    this.unicornStore.setCallouts([]);
    this.unicornStore.setCallouts(await this.unicornRepository.getCallouts(missionId));
    this.checkForCalloutMatches();
  }

  @action.bound
  async getReleasabilities() {
    this.unicornStore.setReleasabilities(await this.unicornRepository.getReleasabilities());
  }

  @action.bound
  isUploadFinished() {
    if (this.slidesStore!.assignedCalloutCount === this.unicornStore!.currentUploadCount) {
      this.unicornStore!.setUploadComplete(true);
      this.metricActions!.updateMetric('UploadToUnicorn');
      this.unicornStore!.setCurrentUploadCount(0);
    }
  }

  @action.bound
  async setUnicornModel(s: SlideModel) {
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

  @action.bound
  async buildUploadModel(slide: SlideModel) {
    this.unicornStore!.setPendingUpload(true);
    await this.unicornRepository.upload(await this.setUnicornModel(slide), this.increaseCurrentUploadCount);
    this.isUploadFinished();
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