import { UnicornStore } from './UnicornStore';

describe('UnicornStore', () => {
  let subject = new UnicornStore();

  it('should return a modal status based on upload and confirmation', () => {
    expect(subject.isModalDisplayed).toBeFalsy();
    subject.setPendingUpload(true);
    expect(subject.isModalDisplayed).toBeTruthy();
  });
});