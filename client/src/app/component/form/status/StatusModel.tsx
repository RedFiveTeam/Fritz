import { action, computed, observable } from 'mobx';

export class StatusModel {
  @observable private _status: string;
  @observable private _files: string[];
  @observable private _times: string[];
  @observable private _progress: number;
  @observable private _total: number;
  @observable private _date: string;
  @observable private _op: string;
  @observable private _callsign: string;

  constructor(
    status: string = '',
    files: string[] = [],
    times: string[] = [],
    progress: number = 0,
    total: number,
    date: string,
    op: string,
    callsign: string
  ) {
    this._status = status;
    this._files = files;
    this._times = times;
    this._progress = progress;
    this._total = total;
    this._date = date;
    this._op = op;
    this._callsign = callsign;
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

  @action.bound
  setOp(value: string) {
    this._op = value;
  }

  @action.bound
  setCallsign(value: string) {
    this._callsign = value;
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

  @computed
  get op(): string {
    return this._op;
  }

  @computed
  get callsign(): string {
    return this._callsign;
  }
}