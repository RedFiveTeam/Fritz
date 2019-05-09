import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Carousel } from './Carousel';
import { SlideModel } from '../slides/models/SlideModel';
import { StyledDropdown } from '../dropdown/Dropdown';
import { CalloutModel } from '../unicorn/model/CalloutModel';

describe('Carousel', () => {
  let subject: ReactWrapper;
  let slideModel1 = new SlideModel('', 'NewTestName', '1234', 'NewActivity');
  let slideModel2 = new SlideModel('', 'NewTestName', '1234', 'NewActivity');
  let slideNumber = 0;
  let slidesStore: any;
  let slidesActions: any;
  let uploadStore: any;
  let unicornStore: any;

  beforeEach(() => {
    uploadStore = {
      hash: '1'
    };

    slidesActions = {
      setAndUpdateActivity: jest.fn(),
      setAndUpdateTime: jest.fn()
    };

    unicornStore = {
      callouts: [new CalloutModel('', '', '', '', '', '')]
    };

    slidesStore = {
      day: 'DD',
      month: 'MON',
      year: 'YY',
      slides: [slideModel1, slideModel2]
    };

    subject = mount(
      <Carousel
        uploadStore={uploadStore}
        slideModel={slideModel1}
        slideNumber={slideNumber}
        slidesStore={slidesStore}
        slidesActions={slidesActions}
        unicornStore={unicornStore}
      />
    );
  });

  it('should render and activity and time input', () => {
    expect(subject.find('#timeInput').exists()).toBeTruthy();
    expect(subject.find('#activityInput').exists()).toBeTruthy();
  });

  it('should render a title for each slide', () => {
    expect(subject.find('.slide').text()).toBe('DD1234ZMONYY_TGT_NAME_NewActivity_ASSET_RELEASABILITY');
  });

  it('should display the number of slides', () => {
    expect(subject.find('.slideNumber').text()).toBe('1 of 2');
  });

  it('should contain a callout dropdown on the carousel', () => {
    expect(subject.find(StyledDropdown).exists()).toBeTruthy();
  });
});