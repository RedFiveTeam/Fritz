import { action, computed, observable } from 'mobx';

export class UploadStore {
  @observable private _uploaded: boolean = false;
  @observable private _fileName: string = '';
  @observable private _folderName: string = '';
  @observable private _hash: string = '';
  @observable private _conversionStatus: boolean = false;
  @observable private _placeholder: boolean = true;
  @observable private _uploading: boolean = false;

  @action.bound
  setUploaded(uploaded: boolean) {
    this._uploaded = uploaded;
  }

  @action.bound
  setFileName(fileName: string) {
    this._fileName = fileName;
  }

  @action.bound
  setFolderName(FolderName: string) {
    this._folderName = FolderName;
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
  setPlaceholder(value: boolean) {
    this._placeholder = value;
  }

  @action.bound
  setUploading(value: boolean) {
    this._uploading = value;
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
  get folderName() {
    return this._folderName;
  }

  @computed
  get hash() {
    return this._hash;
  }

  @computed
  get placeholder(): boolean {
    return this._placeholder;
  }

  @computed
  get uploading(): boolean {
    return this._uploading;
  }
}