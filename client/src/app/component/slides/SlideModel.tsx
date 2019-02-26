import { action, computed, observable } from 'mobx';

export class SlideModel {

  @observable private _oldName: string;
  @observable private _time: string = 'TTTT';
  @observable private _activity: string = 'ACTIVITY';
  @observable private _newName: string = '';

  constructor(
    oldName: string = '',
    newName: string = '',
    time: string = 'TTTT',
    activity: string = 'ACTIVITY'
  ) {
    this._oldName = oldName;
    this._time = time;
    this._activity = activity;
    this._newName = newName;
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

}