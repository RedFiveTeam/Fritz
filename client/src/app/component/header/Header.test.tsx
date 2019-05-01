import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Header } from './Header';
import { StyledClassificationBanner } from '../classification/ClassificationBanner';
import { MissionModel } from '../unicorn/model/MissionModel';

describe('Header', () => {
  let subject: ShallowWrapper;
  let classificationStore: any;
  let classificationActions: any;
  let unicornStore: any;
  let slidesStore: any;

  beforeEach(() => {
    slidesStore = {
      differentAsset: jest.fn()
    };

    unicornStore = {
      activeMission: new MissionModel('1', '04-18-19', 'Kirby1', 'descr', 'open', 'DGS-1', 'Pred'),
      setActiveMission: jest.fn()
    };

    classificationStore = {
      classification: 'UNCLASS'
    };

    classificationActions = {
      initializeStore: jest.fn()
    };

    subject = shallow(
      <Header
        slidesStore={slidesStore}
        unicornStore={unicornStore}
        classificationStore={classificationStore}
        classificationActions={classificationActions}
      />
    );
  });

  it('should contain a classification banner', () => {
    expect(subject.find(StyledClassificationBanner).exists()).toBeTruthy();
  });

  it('should contain a fritz header', () => {
    expect(subject.find('.logo').exists()).toBeTruthy();
  });

  it('should have the correct mission name', () => {
    expect(subject.find('.selectedMission').text()).toContain('Kirby1');
  });

  it('should clear the select mission on change Mission button click', () => {
    subject.find('.changeMissionBtn').simulate('click');
    expect(unicornStore.setActiveMission).toHaveBeenCalledWith(null);
  });
});