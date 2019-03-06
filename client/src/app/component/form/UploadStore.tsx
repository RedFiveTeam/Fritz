import { action, computed, observable } from 'mobx';

export class UploadStore {
  @observable private _uploaded: boolean = false;
  @observable private _fileName: string = '';
  @observable private _processing: boolean = false;
  @observable private _hash: string = '';

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

  @action.bound
  setHash(value: string) {
    this._hash = value;
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

  @computed
  get hash() {
    return this._hash;
  }
}