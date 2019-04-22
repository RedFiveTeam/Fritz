import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Mission } from './Mission';
import { MissionModel } from '../model/MissionModel';

describe('Mission', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;
  let unicornActions: any;
  let mission = new MissionModel('testID1', '04-18-19', 'Kirby1', 'testDescr', 'testStatus', 'DGS-1', 'Pred');

  beforeEach(() => {
    unicornStore = {
      setActiveMission: jest.fn()
    };

    unicornActions = {
      getCallouts: jest.fn()
    };

    subject = shallow(
      <Mission
        unicornStore={unicornStore}
        mission={mission}
        unicornActions={unicornActions}
      />
    );
  });

  it('should display the callsign for the mission', () => {
    expect(subject.find('.callsign').text()).toBe('Kirby1');
  });

  it('should display the start time for the mission', () => {
    expect(subject.find('.startTime').text()).toBe('04-18-19');
  });

  it('should display a select button that sets the mission and retrieves the callouts', () => {
    subject.simulate('click');
    expect(unicornStore.setActiveMission).toHaveBeenCalledWith(mission);
    expect(unicornActions.getCallouts).toHaveBeenCalledWith(mission.id);
  });
});