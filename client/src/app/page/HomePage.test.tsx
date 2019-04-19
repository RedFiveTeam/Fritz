import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomePage } from './HomePage';
import { StyledFooter } from '../component/footer/Footer';
import { StyledAppBody } from '../component/body/AppBody';
import { StyledSelectMissionModal } from '../component/modals/SelectMissionModal';

describe('HomePage', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;

  beforeEach(() => {
    unicornStore = {
      activeMission: null
    };

    subject = shallow(
      <HomePage
        unicornStore={unicornStore}
      />
    );
  });

  it('should have a body', () => {
    expect(subject.find(StyledAppBody).exists()).toBeTruthy();
  });

  it('should have a footer', () => {
    expect(subject.find(StyledFooter).exists()).toBeTruthy();
  });

  it('should show a modal to select the mission', () => {
    expect(subject.find(StyledSelectMissionModal).exists()).toBeTruthy();
  });
});