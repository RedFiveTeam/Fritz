import { action, computed, observable } from 'mobx';

export class SlidesStore {
  @observable private _files: string[] = [];

  @computed
  get files(): string[] {
    return this._files;
  }

  @action.bound
  setFiles(value: string[]) {
    this._files = value;
  }
}