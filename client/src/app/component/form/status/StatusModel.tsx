import { computed, observable } from 'mobx';

export class StatusModel {
  @observable private _status: string;
  @observable private _files: string[];

  constructor(
    status: string = '',
    files: string[] = []
  ) {
    this._status = status;
    this._files = files;
  }

  @computed
  get status(): string {
    return this._status;
  }

  @computed
  get files(): string[] {
    return this._files;
  }
}