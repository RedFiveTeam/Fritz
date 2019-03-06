import { action, computed, observable } from 'mobx';
import { SlideModel } from './SlideModel';

export class SlidesStore {
  @observable private _files: string[] = [];
  @observable private _date: string | null;
  @observable private _opName: string | null;
  @observable private _asset: string | null;
  @observable private _classification: string | null;
  @observable private _slides: SlideModel[] = [];
  @observable private _validate: boolean = false;

  @computed
  get files(): string[] {
    return this._files;
  }

  @computed
  get slides(): SlideModel[] {
    return this._slides;
  }

  @computed
  get date(): string | null {
    return this._date;
  }

  @computed
  get opName(): string | null {
    return this._opName;
  }

  @computed
  get asset(): string | null {
    return this._asset;
  }

  @computed
  get classification(): string | null {
    return this._classification;
  }

  @computed
  get validate(): boolean {
    return this._validate;
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

  @action.bound
  setSlides(value: SlideModel[]) {
    this._slides = value;
  }

  @action.bound
  setValidate(value: boolean) {
    this._validate = value;
  }

  isValidName(): boolean {
    return (this._date !== undefined && this._date!.length > 0) &&
      (this._opName !== undefined && this._opName!.length > 0) &&
      (this._asset !== undefined && this._asset!.length > 0) &&
      (this._classification !== undefined && this._classification!.length > 0);
  }

  isValidDate(): boolean {
    return (this._date !== null && this._date !== undefined && this._date!.length > 0);
  }

  isValidOpName(): boolean {
    return (this._opName !== undefined && this._opName!.length > 0);
  }

  isValidAsset(): boolean {
    return (this._asset !== undefined && this._asset!.length > 0);
  }

  isValidClassification(): boolean {
    return (this._classification !== undefined && this._classification!.length > 0);
  }

  @computed
  get nameFormat(): string {
    return ((this._date || 'DDTTTTZMONYY') + '_' +
      (this._opName || 'TGT_NAME') + '_ACTY_' +
      (this._asset || 'ASSET') + '_' +
      (this._classification || 'CLASSIFICATION'))
        .split(' ').join('_')
        .toUpperCase();
  }
}