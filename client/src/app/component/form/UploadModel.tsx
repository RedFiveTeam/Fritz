import { computed, observable } from 'mobx';

export class UploadModel {
  @observable private _file: string;

  constructor(
    file: string = ''
  ) {
    this._file = file;
  }

  @computed
  get file(): string {
    return this._file;

  }
}
