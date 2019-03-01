import { action, computed, observable } from 'mobx';

export class MetricModel {
  @observable private _id: any = null;
  @observable private _uid: string;
  @observable private _action: string;
  @observable private _time: string;

  constructor(id: any, uid: string, act: string, time: string) {
    this._id = id;
    this._uid = uid;
    this._action = act;
    this._time = time;
  }

  @computed
  get id(): any {
    return this._id;
  }

  @computed
  get uid(): string {
    return this._uid;
  }

  @computed
  get action(): string {
    return this._action;
  }

  @computed
  get time(): string {
    return this._time;
  }

  @action.bound
  setId(value: any) {
    this._id = value;
  }

  @action.bound
  setUid(value: any) {
    this._uid = value;
  }

  @action.bound
  setAction(value: string) {
    this._action = value;
  }

  @action.bound
  setTime(value: string) {
    this._time = value;
  }
}