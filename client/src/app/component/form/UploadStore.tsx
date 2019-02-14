import { action, computed, observable } from 'mobx';

export class UploadStore {
  @observable private _uploaded: boolean = false;
  @observable private _fileName: string = '';

  @action.bound
  setUploaded(uploaded: boolean) {
    this._uploaded = uploaded;
  }

  @action.bound
  setFileName(fileName: string) {
    this._fileName = fileName;
  }

  @computed
  get uploaded() {
    return this._uploaded;
  }

  @computed
  get fileName() {
    return this._fileName;
  }
}