import { action, computed, observable } from 'mobx';
import { SlideModel } from '../models/SlideModel';

export class SlidesStore {

  @observable private _files: string[] = [];
  @observable private _opName: string | null;
  @observable private _asset: string | null;
  @observable private _classification: string | null = 'Secret';
  @observable private _slides: SlideModel[] = [];
  @observable private _activity: string | null;
  @observable private _time: string | null;
  @observable private _month: string | null = 'MON';
  @observable private _year: string | null = 'YY';
  @observable private _day: string | null = 'DD';
  @observable private _help: boolean = false;
  @observable private _releasability: string = '';
  @observable private _fullDate: string;
  @observable private _assignedCalloutCount: number;
  @observable private _differentAsset: boolean = false;
  @observable private _isValidDate: boolean = true;
  @observable private _isValidOpName: boolean = true;
  @observable private _isValidAsset: boolean = true;
  @observable private _isValidReleasability: boolean = false;
  @observable private _hasInitiallyValidated: boolean = false;
  @observable private _errorMessages: string[] = [
    'The date field must not be empty',
    'The op name field must not be empty',
    'The callsign field must not be empty',
    'The callsign does not match selected mission'
  ];
  private months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  @computed
  get errorMessages(): string[] {
    return this._errorMessages;
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

  @computed
  get isValidDate() {
    return this._isValidDate;
  }

  @computed
  get isValidOpName() {
    return this._isValidOpName;
  }

  @computed
  get isValidAsset() {
    return this._isValidAsset;
  }

  @computed
  get isValidReleasability() {
    return this._isValidReleasability;
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

  @computed
  get differentAsset(): boolean {
    return this._differentAsset;
  }

  @computed
  get hasInitiallyValidated(): boolean {
    return this._hasInitiallyValidated;
  }

  @action.bound
  setErrorMessages(value: []) {
    this._errorMessages = value;
  }

  initialValidation() {
    this._hasInitiallyValidated = true;
  }

  isMilitaryDateFormat(date: string) {
    let militaryDate = false;
    this.months.map((month) => {
      if (date.substr(2, 3).toUpperCase() === month.toUpperCase()) {
        militaryDate = true;
      }
    });
    return militaryDate;
  }

  @action.bound
  setFullDate(value: string) {
    if (this.isMilitaryDateFormat(value)) {
      value = this.parseMilitaryDate(value);
    }

    let month = value.substr(5, 2);
    let displayMonth = this.months[parseInt(month, 10) - 1];
    let year = value.substr(2, 2);
    let day = value.substr(8, 2);

    if (month === '' || year === '' || day === '') {
      displayMonth = 'MON';
      year = 'YY';
      day = 'DD';
    }

    this.setMonth(displayMonth);
    this.setYear(year);
    this.setDay(day);
    this._fullDate = value;
  }

  parseMilitaryDate(date: string): string {
    let monthIndex = 0;
    this.months.map((m, index) => {
      if (date.toUpperCase().includes(m.toUpperCase())) {
        monthIndex = index + 1;
        return;
      }
    });

    let month = ('0' + monthIndex.toString().substr(0, 2)).slice(-2);
    let day = ('0' + date.substr(0, 2)).slice(-2);
    let year = date.slice(-2);
    return `20${year}-${month}-${day}`;
  }

  @action.bound
  setDifferentAsset(value: boolean) {
    this._differentAsset = value;
    this._isValidAsset = !value;
  }

  @action.bound
  setAssignedCalloutCount(value: number) {
    this._assignedCalloutCount = value;
  }

  @action.bound
  setReleasability(value: string) {
    this._releasability = value;
    this.validateReleasability();
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

  validate(): boolean {
    if (this.hasInitiallyValidated) {
      this.validateDate();
      this.validateOpName();
      this.validateAsset();
      this.validateReleasability();
      this.validateDifferentAsset();
    }
    return this.areAllFieldsValid();
  }

  isValidDay(): boolean {
    return (this.isValidDateInput(this._day, 'DD'));
  }

  isValidMonth(): boolean {
    return (this.isValidDateInput(this._month, 'MON'));
  }

  isValidYear(): boolean {
    return (this.isValidDateInput(this._year, 'YY'));
  }

  isValidDateInput(
    input: string | undefined | null,
    template: string
  ): boolean {
    return (
      input !== null &&
      input !== undefined &&
      input !== template &&
      input.length === template.length
    );
  }

  private areAllFieldsValid(): boolean {
    if (this.hasInitiallyValidated) {
      return (
        this.isValidDate &&
        this.isValidOpName &&
        this.isValidAsset &&
        this.isValidReleasability
      );
    }
    return false;
  }

  private validateDate() {
    this._isValidDate = (
      this.isValidDay() &&
      this.isValidMonth() &&
      this.isValidYear()
    );
  }

  private validateOpName() {
    this._isValidOpName = (
      this._opName != null
      && this._opName !== ''
    );
  }

  private validateAsset() {
    this._isValidAsset = (
      this._asset != null
      && this._asset !== ''
      && !this._differentAsset
    );
  }

  private validateReleasability() {
    this._isValidReleasability = (
      this._releasability != null
      && this._releasability !== ''
    );
  }

  private validateDifferentAsset() {
    return this._differentAsset;
  }
}