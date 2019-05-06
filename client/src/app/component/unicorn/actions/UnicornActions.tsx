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
    this.unicornStore.setCallouts(await this.unicornRepository.getCallouts(missionId));
    if (this.slidesStore.slides.length > 1) {
      for (let i = 0; i < this.slidesStore.slides.length; i++) {
        this.unicornStore.callouts.map((c) => {
          if (this.unicornStore.callouts[i] && this.unicornStore.callouts[i].time &&
            this.unicornStore.callouts[i].time.length > 1 && this.slidesStore.slides[i] &&
            this.slidesStore.slides[i].time && this.slidesStore.slides[i].time.length > 1) {
            if (this.unicornStore.callouts[i].time.toString().indexOf(this.slidesStore.slides[i].time) > -1) {
              let calloutMatches = this.unicornStore.callouts.filter((f) => {
                if (f.time && f.time.length > 0) {
                  return f.time.indexOf(this.slidesStore.slides[i].time) > -1;
                }
                return false;
              });
              let timeMatches = this.slidesStore.slides.filter((s) => {
                if (s.time && s.time.length) {
                  return s.time.indexOf(c.time.replace('Z', ''));
                }
                return false;
              });
              if (timeMatches.length < 2 && calloutMatches.length < 2) {
                this.slidesStore.slides[i].setTargetEventId(this.unicornStore.callouts[i].eventId);
              }
            }
          }
        });
      }
    }
  }

  @action.bound
  async getReleasabilities() {
    this.unicornStore.setReleasabilities(await this.unicornRepository.getReleasabilities());
  }

  @action.bound
  async buildUploadModel(slide: SlideModel) {
    this.unicornStore!.setPendingUpload(true);
    let unicornUploadModel = new UnicornUploadModel();
    unicornUploadModel.setFileName(slide.oldName);
    unicornUploadModel.setEndFilePath('\\Mission\\' + this.unicornStore.activeMission!.id);
    unicornUploadModel.setProductName(slide.oldName);
    unicornUploadModel.setClassificationId('a8b17b94-f23a-41a1-822f-96c7ce642006');
    unicornUploadModel.setTargetEventId(slide.targetEventId);
    this.setReleasabilityId(this.unicornStore!.releasability);
    unicornUploadModel.setReleasabilityId(this.unicornStore!.releasabilityId);
    unicornUploadModel.setMissionId(this.unicornStore.activeMission!.id);
    unicornUploadModel.setPersonnelId('2a7081f8-7cc9-45f3-a29e-f94a0003b3fe');
    unicornUploadModel.setIsrRoleId('');
    await this.unicornRepository.upload(unicornUploadModel, this.increaseCurrentUploadCount);
    if (this.slidesStore!.assignedCalloutCount === this.unicornStore!.currentUploadCount) {
      this.unicornStore!.setUploadComplete(true);
      this.metricActions!.updateMetric('UploadToUnicorn');
      this.unicornStore!.setCurrentUploadCount(0);
    }
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
  }
}