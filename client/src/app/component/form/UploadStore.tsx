import { action, computed, observable } from 'mobx';

export class UploadStore {
  @observable private _uploaded: boolean = false;
  @observable private _fileName: string = '';
  @observable private _processing: boolean = false;

  @action.bound
  setUploaded(uploaded: boolean) {
    this._uploaded = uploaded;
  }

  @action.bound
  setFileName(fileName: string) {
    this._fileName = fileName;
  }

  @action.bound
  setProcessing(value: boolean) {
    this._processing = value;
  }

  @computed
  get uploaded() {
    return this._uploaded;
  }

  @computed
  get fileName() {
    return this._fileName;
  }

  @computed
  get processing() {
    return this._processing;
  }
}