import { action, computed, observable } from 'mobx';
import { MissionModel } from '../model/MissionModel';
import { UnicornRepository } from '../repositories/UnicornRepository';
import { CalloutModel } from '../model/CalloutModel';
import { ReleasabilityModel } from '../model/ReleasabilityModel';
import { SlideModel } from '../../slides/models/SlideModel';

const fmvPlatforms = ['pred', 'predator', 'reaper', 'mc-12'];

export class UnicornStore {

  @observable private _missions: MissionModel[] = [];
  @observable private _activeMission: MissionModel | null;
  @observable private _selectedSite: string = 'DGS 1';
  @observable private _callouts: CalloutModel[] = [];
  @observable private _releasabilities: ReleasabilityModel[] = [];
  @observable private _releasability: string;
  @observable private _releasabilityId: string;
  @observable private _pendingUpload: boolean = false;
  @observable private _uploadComplete: boolean = false;
  @observable private _currentUploadCount: number = 0;
  @observable private _unassignedCallouts: boolean = false;
  @observable private _isUploading: boolean = false;
  @observable private _loading: boolean;
  @observable private _pendingCallouts: boolean = true;
  @observable private _uploadQueue: SlideModel[] = [];
  @observable private _uploadsInProgress: boolean = false;
  @observable private _offline: boolean = false;
  @observable private _offlineModal: boolean = false;

  async hydrate(unicornRepository: UnicornRepository) {
    let code = await unicornRepository.getStatus();
    if (code === 200) {
      this.setOffline(false);
      this.setLoading(true);
      if (navigator.userAgent.toLowerCase().indexOf('electron') !== -1) {
        this._missions.push(new MissionModel(
          'testId', 'starttime', 'TEST11', 'fake mission', 'OPEN', 'DGS 1', 'Pred')
        );
        this._releasabilities.push(new ReleasabilityModel('', 'FOUO'));
      } else {
        this._releasabilities = (await unicornRepository.getReleasabilities());
        this._missions = (await unicornRepository.getMissions())
          .filter((m) => {
            return fmvPlatforms.indexOf(m.platform.toLowerCase()) > -1;
          });
        this.setLoading(false);
      }
    } else {
      this.setOffline(true);
      this.setOfflineModal(true);
    }
  }

  @computed
  get offlineModal(): boolean {
    return this._offlineModal;
  }

  @computed
  get offline(): boolean {
    return this._offline;
  }

  @computed
  get uploadQueue(): SlideModel[] {
    return this._uploadQueue;
  }

  @computed
  get loading(): boolean {
    return this._loading;
  }

  @computed
  get isModalDisplayed() {
    return (this._pendingUpload);
  }

  @computed
  get unassignedCallouts(): boolean {
    return this._unassignedCallouts;
  }

  @computed
  get currentUploadCount(): number {
    return this._currentUploadCount;
  }

  @computed
  get releasability(): string {
    return this._releasability;
  }

  @computed
  get releasabilityId(): string {
    return this._releasabilityId;
  }

  @computed
  get releasabilities(): ReleasabilityModel[] {
    return this._releasabilities;
  }

  @computed
  get missions(): MissionModel[] {
    return this._missions;
  }

  @computed
  get activeMission(): MissionModel | null {
    return this._activeMission;
  }

  @computed
  get selectedSite(): string {
    return this._selectedSite;
  }

  @computed
  get callouts(): CalloutModel[] {
    return this._callouts;
  }

  @computed
  get pendingUpload(): boolean {
    return this._pendingUpload;
  }

  @computed
  get isUploading(): boolean {
    return this._isUploading;
  }

  @computed
  get uploadComplete(): boolean {
    return this._uploadComplete;
  }

  @computed
  get pendingCallouts(): boolean {
    return this._pendingCallouts;
  }

  @computed
  get uploadsInProgress(): boolean {
    return this._uploadsInProgress;
  }

  @action.bound
  setOfflineModal(value: boolean) {
    this._offlineModal = value;
  }

  @action.bound
  setOffline(value: boolean) {
    this._offline = value;
  }

  @action.bound
  setUnassignedCallouts(value: boolean) {
    this._unassignedCallouts = value;
  }

  @action.bound
  setMissions(value: MissionModel[]) {
    this._missions = value;
  }

  @action.bound
  setActiveMission(value: MissionModel | null) {
    this._activeMission = value;
  }

  @action.bound
  setSelectedSite(value: string) {
    this._selectedSite = value;
  }

  @action.bound
  setCallouts(value: CalloutModel[]) {
    this._callouts = value;
  }

  @action.bound
  setReleasabilities(value: ReleasabilityModel[]) {
    this._releasabilities = value;
  }

  @action.bound
  setReleasability(value: string) {
    this._releasability = value;
  }

  @action.bound
  setReleasabilityId(value: string) {
    this._releasabilityId = value;
  }

  @action.bound
  setPendingUpload(value: boolean) {
    this._pendingUpload = value;
  }

  @action.bound
  setUploadComplete(value: boolean) {
    this._uploadComplete = value;
    if (value) {
      this._isUploading = false;
    }
  }

  @action.bound
  setCurrentUploadCount(value: number) {
    this._currentUploadCount = value;
  }

  @action.bound
  setIsUploading(status: boolean) {
    if (status) {
      this._uploadComplete = false;
    }
    this._isUploading = status;
  }

  @action.bound
  setLoading(value: boolean) {
    this._loading = value;
  }

  @action.bound
  setPendingCallouts(value: boolean) {
    this._pendingCallouts = value;
  }

  addToUploadQueue(slide: SlideModel) {
    this._uploadQueue.push(slide);
  }

  @action.bound
  setUploadsInProgress(value: boolean) {
    this._uploadsInProgress = value;
  }
}