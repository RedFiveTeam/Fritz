import { SlidesStore } from './SlidesStore';

describe('SlidesStore', () => {
  let subject: SlidesStore;

  beforeEach(() => {
    subject = new SlidesStore();
    subject.initialValidation();
  });

  it('should not validate on the first time', () => {
    subject = new SlidesStore();
    expect(subject.validate()).toBeFalsy();
  });

  it('should report that all fields are valid', () => {
    expect(subject.validate()).toBeFalsy();
    subject.setMonth('MAY');
    subject.setDay('09');
    subject.setYear('19');
    subject.setOpName('VALID OP NAME');
    subject.setAsset('VALID ASSET');
    subject.setReleasability('VALID RELEASABILITY');
    expect(subject.validate()).toBeTruthy();
  });

  it('should validate a date', () => {
    subject.setMonth('MAY');
    subject.setDay('09');
    subject.setYear('19');
    subject.validate();
    expect(subject.isValidDate).toBeTruthy();

    subject.setMonth('MAY');
    subject.setDay('MAY');
    subject.setYear('MAY');
    subject.validate();
    expect(subject.isValidDate).toBeFalsy();
  });

  it('should check common strings for null, undefined, and length', () => {
    expect(subject.isValidDateInput(undefined, 'MON')).toBeFalsy();
    expect(subject.isValidDateInput(null, 'DD')).toBeFalsy();
    expect(subject.isValidDateInput('', 'YY')).toBeFalsy();
    expect(subject.isValidDateInput('asdfkljhasdfkjh', 'MON')).toBeFalsy();
    expect(subject.isValidDateInput('a', 'MON')).toBeFalsy();
    expect(subject.isValidDateInput('MON', 'MON')).toBeFalsy();
    expect(subject.isValidDateInput('09', 'DD')).toBeTruthy();
    expect(subject.isValidDateInput('JUN', 'MON')).toBeTruthy();
    expect(subject.isValidDateInput('19', 'YY')).toBeTruthy();
  });

  it('should invalidate an empty op name', () => {
    subject.setOpName('op name');
    subject.validate();
    expect(subject.isValidOpName).toBeTruthy();

    subject.setOpName('');
    subject.validate();
    expect(subject.isValidOpName).toBeFalsy();
  });

  it('should invalidate an empty asset', () => {
    subject.setAsset('asset ');
    subject.validate();
    expect(subject.isValidAsset).toBeTruthy();

    subject.setAsset('');
    subject.validate();
    expect(subject.isValidAsset).toBeFalsy();
  });

  it('should invalidate a mismatched asset', () => {
    subject.setDifferentAsset(true);
    expect(subject.isValidAsset).toBeFalsy();
  });

  it('should invalidate empty releasability', () => {
    subject.setReleasability('FOUO');
    subject.validate();
    expect(subject.isValidReleasability).toBeTruthy();

    subject.setReleasability('');
    subject.validate();
    expect(subject.isValidReleasability).toBeFalsy();
  });

  it('should parse and set all date segments on date change', () => {
    subject.setFullDate('2019-05-21');
    expect(subject.fullDate).toBe('2019-05-21');
    expect(subject.day).toBe('21');
    expect(subject.month).toBe('MAY');
    expect(subject.year).toBe('19');

    subject.setFullDate('27JAN19');
    expect(subject.fullDate).toBe('2019-01-27');
    expect(subject.day).toBe('27');
    expect(subject.month).toBe('JAN');
    expect(subject.year).toBe('19');

    subject.setFullDate('');
    expect(subject.fullDate).toBe('');
    expect(subject.day).toBe('DD');
    expect(subject.month).toBe('MON');
    expect(subject.year).toBe('YY');
  });

  it('should determine if military date or input date format', () => {
    expect(subject.isMilitaryDateFormat('01JAN19')).toBeTruthy();
    expect(subject.isMilitaryDateFormat('2019-05-21')).toBeFalsy();
  });

  it('should transform a military date into common input string', () => {
    expect(subject.parseMilitaryDate('27JAN19')).toBe('2019-01-27');
  });

  it('should set date placeholders on empty dates', () => {
    expect(subject.day).toBe('DD');
    expect(subject.month).toBe('MON');
    expect(subject.year).toBe('YY');
  });
});