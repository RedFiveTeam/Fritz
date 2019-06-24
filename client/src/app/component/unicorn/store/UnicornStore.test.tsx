import { UnicornStore } from './UnicornStore';
import { CalloutModel } from '../model/CalloutModel';
import { DropdownOption } from '../../dropdown/Dropdown';
import { ReleasabilityModel } from '../model/ReleasabilityModel';

describe('UnicornStore', () => {
  let subject = new UnicornStore();

  it('should return a modal status based on upload and confirmation', () => {
    expect(subject.isModalDisplayed).toBeFalsy();
    subject.setPendingUpload(true);
    expect(subject.isModalDisplayed).toBeTruthy();
  });

  it('should return only useable callouts (i.e., not blank)', () => {
    subject.setCallouts([
      new CalloutModel('n1', 'c1', 'r1', 'a1', 'eventId1', 'time1'),
      new CalloutModel('n1', 'c1', 'r1', 'a1', 'eventId1', 'time2'),
      new CalloutModel('n1', 'c1', 'r1', 'a1', 'eventId1', ''),
      new CalloutModel('n1', 'c1', 'r1', 'a1', 'eventId1', '')
    ]);
    expect(subject.calloutOptions).toEqual(
      [
        new DropdownOption('eventId1', 'time1'),
        new DropdownOption('eventId1', 'time2'),
      ]
    );
  });

  it('should return releasability dropdown options sorted correctly', () => {
    subject.setReleasabilities([
      new ReleasabilityModel('id1', 'name1', 1),
      new ReleasabilityModel('id2', 'name2', 2),
      new ReleasabilityModel('id3', 'name3', 3),
      new ReleasabilityModel('id5', 'NOFORN', 0),
      new ReleasabilityModel('id4', 'FOUO', 0)
    ]);
    subject.setPendingReleasability('FOUO TEST');
    expect(subject.releasabilityOptions).toEqual(
      [
        new DropdownOption('id3', 'name3'),
        new DropdownOption('id2', 'name2'),
        new DropdownOption('id1', 'name1'),
        new DropdownOption('id4', 'FOUO'),
        new DropdownOption('id5', 'NOFORN')
      ]
    );
  });
});