import { action, computed, observable } from 'mobx';

export class UploadStore {
  @observable private _uploaded: boolean = false;
  @observable private _fileName: string = '';
  @observable private _processing: boolean = false;
  @observable private _hash: string = '';
  @observable private _conversionStatus: boolean = false;
  @observable private _progress: number;
  @observable private _total: number;
  @observable private _percentConverted: number;
  @observable private _placeholder: boolean = true;

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

  @action.bound
  setConversionStatus(value: boolean) {
    this._conversionStatus = value;
  }

  @action.bound
  setProgress(value: number) {
    this._progress = value;
  }

  @action.bound
  setTotal(value: number) {
    this._total = value;
  }

  @action.bound
  setPlaceholder(value: boolean) {
    this._placeholder = value;
  }

  @computed
  get PercentConverted() {
    this._percentConverted = Math.ceil((this.progress / this.total) * 100);
    return this._percentConverted;
  }

  @computed
  get ConversionStatus() {
    return this._conversionStatus !== null;
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

  @computed
  get progress() {
    return this._progress;
  }

  @computed
  get total() {
    return this._total;
  }

  @computed
  get placeholder(): boolean {
    return this._placeholder;
  }
}