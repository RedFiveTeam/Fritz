import { action, computed, observable } from 'mobx';

export class StatusModel {
  @observable private _status: string;
  @observable private _files: string[];
  @observable private _progress: number;
  @observable private _total: number;

  constructor(
    status: string = '',
    files: string[] = [],
    progress: number = 0,
    total: number
  ) {
    this._status = status;
    this._files = files;
    this._progress = progress;
    this._total = total;
  }

  @action.bound
  setProgress(progress: number) {
    this._progress = progress;
  }

  @action.bound
  setTotal(total: number) {
    this._total = total;
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
  get progress(): number {
    return this._progress;
  }

  @computed
  get total(): number {
    return this._total;
  }
}