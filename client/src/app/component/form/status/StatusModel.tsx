import { action, computed, observable } from 'mobx';

export class StatusModel {
  @observable private _status: string;
  @observable private _files: string[];
  @observable private _times: string[];
  @observable private _progress: number;
  @observable private _total: number;
  @observable private _date: string;

  constructor(
    status: string = '',
    files: string[] = [],
    times: string[] = [],
    progress: number = 0,
    total: number,
    date: string
  ) {
    this._status = status;
    this._files = files;
    this._times = times;
    this._progress = progress;
    this._total = total;
    this._date = date;
  }

  @action.bound
  setProgress(progress: number) {
    this._progress = progress;
  }

  @action.bound
  setTotal(total: number) {
    this._total = total;
  }

  @action.bound
  setDate(value: string) {
    this._date = value;
  }

  @computed
  get status(): string {
    return this._status;
  }

  @computed
  get files(): string[] {
    return this._files;
  }

  @computed
  get times(): string[] {
    return this._times;
  }

  @computed
  get progress(): number {
    return this._progress;
  }

  @computed
  get total(): number {
    return this._total;
  }

  @computed
  get date(): string {
    return this._date;
  }
}