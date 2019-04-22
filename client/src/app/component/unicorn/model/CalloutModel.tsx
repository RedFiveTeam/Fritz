import { action, computed, observable } from 'mobx';

export class CalloutModel {

  @observable private _name: string;
  @observable private _classification: string;
  @observable private _releasability: string;
  @observable private _activity: string;
  @observable private _eventId: string;
  @observable private _time: string;

  constructor(
    name: string, classification: string, releasability: string, activity: string, eventId: string, time: string
  ) {
    this._name = name;
    this._classification = classification;
    this._releasability = releasability;
    this._activity = activity;
    this._eventId = eventId;
    this._time = time;
  }

  @computed
  get name(): string {
    return this._name;
  }

  @action.bound
  setName(value: string) {
    this._name = value;
  }

  @computed
  get classification(): string {
    return this._classification;
  }

  @action.bound
  setClassification(value: string) {
    this._classification = value;
  }

  @computed
  get releasability(): string {
    return this._releasability;
  }

  @action.bound
  setReleasability(value: string) {
    this._releasability = value;
  }

  @computed
  get activity(): string {
    return this._activity;
  }

  @action.bound
  setActivity(value: string) {
    this._activity = value;
  }

  @computed
  get eventId(): string {
    return this._eventId;
  }

  @action.bound
  setEventId(value: string) {
    this._eventId = value;
  }

  @computed
  get time(): string {
    return this._time;
  }

  @action.bound
  setTime(value: string) {
    this._time = value;
  }
}