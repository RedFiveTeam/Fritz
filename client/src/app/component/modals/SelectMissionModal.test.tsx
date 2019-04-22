import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SelectMissionModal } from './SelectMissionModal';
import { MissionModel } from '../unicorn/model/MissionModel';
import { StyledMission } from '../unicorn/Mission/Mission';

describe('SelectMissionModal', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;
  let unicornActions: any;

  beforeEach(() => {
    unicornActions = {
      initializeStores: jest.fn()
    };

    unicornStore = {
      missions: [
        new MissionModel('1', '04-17-19', 'testCallsign1', 'testDescr1', 'openTest1', 'DGS 1'),
        new MissionModel('2', '04-18-19', 'testCallsign2', 'testDescr2', 'openTest2', 'DGS 1'),
        new MissionModel('3', '04-19-19', 'testCallsign3', 'testDescr3', 'openTest3', 'DGS 1')
      ],
      selectedSite: 'DGS 1'
    };

    subject = shallow(
      <SelectMissionModal
        unicornActions={unicornActions}
        unicornStore={unicornStore}
      />
    );
  });

  it('should initialize the stores', () => {
    expect(unicornActions.initializeStores).toHaveBeenCalled();
  });

  it('should display a list of missions', () => {
    expect(subject.find(StyledMission).length).toBe(3);
  });
});