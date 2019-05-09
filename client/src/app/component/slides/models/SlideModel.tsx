import { action, computed, observable } from 'mobx';

export class SlideModel {

  @observable private _oldName: string;
  @observable private _time: string = 'TTTT';
  @observable private _activity: string = 'ACTY';
  @observable private _newName: string = '';
  @observable private _deleted: boolean = false;
  @observable private _targetEventId: string = '';
  @observable private _releasabilityId: string = '';
  @observable private _id: number | null = null;
  @observable private _calloutTime: string | null = null;
  @observable private _uploading: boolean | null = null;
  @observable private _failed: boolean | null = null;

  constructor(
    oldName: string = '',
    newName: string = '',
    time: string = 'TTTT',
    activity: string = 'ACTY',
    deleted: boolean = false,
    targetEventId: string = '',
    releasabilityId: string = '',
  ) {
    this._oldName = oldName;
    this._time = time;
    this._activity = activity;
    this._newName = newName;
    this._deleted = deleted;
    this._targetEventId = targetEventId;
    this._releasabilityId = releasabilityId;
  }

  @computed
  get calloutTime(): string | null {
    return this._calloutTime;
  }

  @computed
  get oldName(): string {
    return this._oldName;
  }

  @computed
  get newName(): string {
    return this._newName;
  }

  @computed
  get time(): string {
    return this._time;
  }

  @computed
  get activity(): string {
    return this._activity;
  }

  @computed
  get deleted(): boolean {
    return this._deleted;
  }

  @computed
  get targetEventId(): string {
    return this._targetEventId;
  }

  @computed
  get releasabilityId(): string {
    return this._releasabilityId;
  }

  @computed
  get id(): number | null {
    return this._id;
  }

  @computed
  get uploading(): boolean | null {
    return this._uploading;
  }

  @computed
  get failed(): boolean | null {
    return this._failed;
  }

  @action.bound
  setOldName(value: string) {
    this._oldName = value;
  }

  @action.bound
  setNewName(value: string) {
    this._newName = value;
  }

  @action.bound
  setTime(value: string) {
    this._time = value;
  }

  @action.bound
  setActivity(value: string) {
    this._activity = value;
  }

  @action.bound
  setDeleted(value: boolean) {
    this._deleted = value;
  }

  @action.bound
  setTargetEventId(value: string) {
    this._targetEventId = value;
  }

  @action.bound
  setReleasabilityId(value: string) {
    this._releasabilityId = value;
  }

  @action.bound
  setId(value: number | null) {
    this._id = value;
  }

  @action.bound
  setCalloutTime(value: string | null) {
    this._calloutTime = value;
  }

  @action.bound
  setUploading(value: boolean | null) {
    this._uploading = value;
  }

  @action.bound
  setFailed(value: boolean | null) {
    this._failed = value;
  }
}