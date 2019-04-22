import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Mission } from './Mission';
import { MissionModel } from '../model/MissionModel';

describe('Mission', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;
  let mission = new MissionModel('testID1', '04-18-19', 'Kirby1', 'testDescr', 'testStatus', 'DGS-1');

  beforeEach(() => {
    unicornStore = {
      setActiveMission: jest.fn()
    };

    subject = shallow(
      <Mission
        unicornStore={unicornStore}
        mission={mission}
      />
    );
  });

  it('should display the callsign for the mission', () => {
    expect(subject.find('.callsign').text()).toBe('Kirby1');
  });

  it('should display the start time for the mission', () => {
    expect(subject.find('.startTime').text()).toBe('04-18-19');
  });

  it('should display a select button that sets the mission', () => {
    subject.simulate('click');
    expect(unicornStore.setActiveMission).toHaveBeenCalledWith(mission);
  });
});