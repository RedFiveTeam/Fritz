import { action, computed, observable } from 'mobx';

export class ReleasabilityModel {
  @observable private _releasabilityId: string;
  @observable private _releasabilityName: string;

  constructor(releasabilityId: string, releasabilityName: string) {
    this._releasabilityId = releasabilityId;
    this._releasabilityName = releasabilityName;
  }

  @computed
  get releasabilityId(): string {
    return this._releasabilityId;
  }

  @computed
  get releasabilityName(): string {
    return this._releasabilityName;
  }

  @action.bound
  setReleasabilityId(value: string) {
    this._releasabilityId = value;
  }

  @action.bound
  setReleasabilityName(value: string) {
    this._releasabilityName = value;
  }
}