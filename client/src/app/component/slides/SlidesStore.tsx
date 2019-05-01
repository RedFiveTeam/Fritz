import { action, computed, observable } from 'mobx';
import { SlideModel } from './SlideModel';

export class SlidesStore {

  @observable private _files: string[] = [];
  @observable private _opName: string | null;
  @observable private _asset: string | null;
  @observable private _classification: string | null = 'Secret';
  @observable private _slides: SlideModel[] = [];
  @observable private _validate: boolean = false;
  @observable private _activity: string | null;
  @observable private _time: string | null;
  @observable private _month: string | null = 'MON';
  @observable private _year: string | null = 'YY';
  @observable private _day: string | null = 'DD';
  @observable private _help: boolean = false;
  @observable private _releasability: string;
  @observable private _fullDate: string;
  @observable private _assignedCalloutCount: number;
  @observable private _differentAsset: boolean = false;
  
  @computed
  get differentAsset(): boolean {
    return this._differentAsset;
  }

  @computed
  get assignedCalloutCount(): number {
    return this._assignedCalloutCount;
  }

  @computed
  get month(): string | null {
    return this._month;
  }

  @computed
  get year(): string | null {
    return this._year;
  }

  @computed
  get day(): string | null {
    return this._day;
  }

  @computed
  get time(): string | null {
    return this._time;
  }

  @computed
  get activity(): string | null {
    return this._activity;
  }

  @computed
  get files(): string[] {
    return this._files;
  }

  @computed
  get slides(): SlideModel[] {
    return this._slides;
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

  @computed
  get help(): boolean {
    return this._help;
  }

  @computed
  get releasability(): string {
    return this._releasability;
  }

  @computed
  get fullDate(): string {
    return this._fullDate;
  }

  @action.bound
  setDifferentAsset(value: boolean) {
    this._differentAsset = value;
  }

  @action.bound
  setAssignedCalloutCount(value: number) {
    this._assignedCalloutCount = value;
  }

  @action.bound
  setReleasability(value: string) {
    this._releasability = value;
  }

  @action.bound
  setClassification(value: string | null) {
    this._classification = value;
  }

  @action.bound
  setTime(slide: SlideModel, value: string) {
    this._time = value;
    slide.setTime(value);
  }

  @action.bound
  setActivity(slide: SlideModel, value: string) {
    this._activity = value;
    slide.setActivity(value);
  }

  @action.bound
  setFiles(value: string[]) {
    this._files = value;
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
  setSlides(value: SlideModel[]) {
    this._slides = value;
  }

  @action.bound
  setValidate(value: boolean) {
    this._validate = value;
  }

  @action.bound
  setMonth(value: string | null) {
    this._month = value;
  }

  @action.bound
  setYear(value: string | null) {
    this._year = value;
  }

  @action.bound
  setDay(value: string | null) {
    this._day = value;
  }

  @action.bound
  setHelp(value: boolean) {
    this._help = value;
  }

  @action.bound
  setFullDate(value: string) {
    this._fullDate = value;
  }

  isValidName(): boolean {
    return (
      (this._opName !== undefined && this._opName!.length > 0) &&
      (this._asset !== undefined && this._asset!.length > 0)
    );
  }

  isValidDate(): boolean {
    return (
      (
        (
          this._day !== 'DD' &&
          this._month !== 'MON' &&
          this._year !== 'YY'
        ) &&
        this._day !== null &&
        this._day !== undefined &&
        this._day.length > 0 &&
        this._month !== null &&
        this._month !== undefined &&
        this._month.length > 0 &&
        this._year !== null &&
        this._year !== undefined &&
        this._year.length > 0
      )
    );
  }

  isValidOpName(): boolean {
    return (this._opName !== undefined && this._opName!.length > 0);
  }

  isValidAsset(): boolean {
    return (this._asset !== undefined && this._asset!.length > 0);
  }

  isValidReleasability(): boolean {
    return (this._releasability !== undefined);
  }

  @computed
  get nameFormat(): string {
    return ((
      (this._day || 'DD') +
      (this._time || 'TTTT') + 'Z' +
      (this._month || 'MON') +
      (this._year || 'YY') + '_' +
      (this._opName || 'TGT_NAME') + '_' +
      (this._activity || '_ACTY_') + '_' +
      (this._asset || 'ASSET') + '_' +
      (this._releasability || 'RELEASABILITY'))
      .split(' ').join('_')
      .toUpperCase());
  }
}