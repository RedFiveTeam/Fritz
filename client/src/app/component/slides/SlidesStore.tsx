import { action, computed, observable } from 'mobx';

export class SlidesStore {
  @observable private _files: string[] = [];
  @observable private _date: string | null;
  @observable private _opName: string | null;
  @observable private _asset: string | null;
  @observable private _classification: string | null;

  @computed
  get files(): string[] {
    return this._files;
  }

  @action.bound
  setFiles(value: string[]) {
    this._files = value;
  }

  @action.bound
  setDate(value: string | null) {
    this._date = value;
  }

  @action.bound
  setOpName(value: string) {
    this._opName = value;
  }

  @action.bound
  setAsset(value: string) {
    this._asset = value;
  }

  @action.bound
  setClassification(value: string) {
    this._classification = value;
  }

  @computed get nameFormat(): string {
    return ((this._date || 'DDTTTTZMONYY') + '_' +
      (this._opName || 'TGT_NAME') + '_ACTIVITY_' +
      (this._asset || 'ASSET') + '_' +
      (this._classification || 'CLASSIFICATION'))
        .split(' ').join('_')
        .toUpperCase();
  }
}