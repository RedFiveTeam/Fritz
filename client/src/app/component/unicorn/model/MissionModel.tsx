import { action, computed, observable } from 'mobx';

export class MissionModel {
  @observable private _id: string;
  @observable private _startTime: string;
  @observable private _callsign: string;
  @observable private _description: string;
  @observable private _status: string;

  constructor(id: string, startTime: string, callsign: string, description: string, status: string) {
    this._id = id;
    this._startTime = startTime;
    this._callsign = callsign;
    this._description = description;
    this._status = status;
  }

  @computed
  get id(): string {
    return this._id;
  }

  @computed
  get startTime(): string {
    return this._startTime;
  }

  @computed
  get callsign(): string {
    return this._callsign;
  }

  @computed
  get description(): string {
    return this._description;
  }

  @computed
  get status(): string {
    return this._status;
  }

  @action.bound
  setId(value: string) {
    this._id = value;
  }

  @action.bound
  setStartTime(value: string) {
    this._startTime = value;
  }

  @action.bound
  setCallsign(value: string) {
    this._callsign = value;
  }

  @action.bound
  setDescription(value: string) {
    this._description = value;
  }

  @action.bound
  setStatus(value: string) {
    this._status = value;
  }
}