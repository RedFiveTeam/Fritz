import { computed, observable } from 'mobx';

export class StatusModel {
  @observable private _status: string;

  constructor(
    status: string = ''
  ) {
    this._status = status;
  }

  @computed
  get status(): string {
    return this._status;
  }
}