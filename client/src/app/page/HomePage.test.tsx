import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomePage } from './HomePage';
import { StyledFooter } from '../component/footer/Footer';
import { StyledAppBody } from '../component/body/AppBody';
import { StyledSelectMissionModal } from '../component/modals/SelectMissionModal';
import { StyledHelpMenu } from '../component/modals/HelpMenu';
import { SlidesStore } from '../component/slides/SlidesStore';

describe('HomePage', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;
  let slidesStore: SlidesStore;

  beforeEach(() => {
    unicornStore = {
      activeMission: null,
    };

    slidesStore = new SlidesStore();

    subject = shallow(
      <HomePage
        unicornStore={unicornStore}
        slidesStore={slidesStore}
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

  it('should show a help menu modal when help is true', () => {
    expect(subject.find(StyledHelpMenu).exists()).toBeFalsy();
    slidesStore.setHelp(true);
    expect(subject.find(StyledHelpMenu).exists()).toBeTruthy();
  });
});