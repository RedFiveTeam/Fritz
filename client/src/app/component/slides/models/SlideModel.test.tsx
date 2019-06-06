import { SlideModel } from './SlideModel';

describe('SlideModel', () => {
  let subject: SlideModel;

  beforeEach(() => {
    subject = new SlideModel();
  });

  it('should validateInput time', () => {
    subject.setTime('Z');
    expect(subject.isValidTime).toBeFalsy();
    subject.setTime('9999');
    expect(subject.isValidTime).toBeFalsy();
    subject.setTime('1234');
    expect(subject.isValidTime).toBeTruthy();
  });
});