import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { SlideCard } from './SlideCard';
import { Provider } from 'mobx-react';
import { StyledCallout } from '../../unicorn/Callout/Callout';
import { CalloutModel } from '../../unicorn/model/CalloutModel';
import { SlideModel } from '../models/SlideModel';

describe('SlideCard', () => {
  let subject: ReactWrapper;
  let slideNumber: any;
  let slideModel = new SlideModel('', 'NewTestName', '1234', 'NewActivity');
  let slidesActions: any;
  let slidesStore: any;
  let uploadStore: any;
  let metricActions: any;
  let unicornStore: any;
  let unicornActions: any;

  beforeEach(() => {
    uploadStore = {
      hash: 'ljndslkm'
    };

    slideNumber = 2;

    slidesStore = {
      day: 'DD',
      month: 'MON',
      year: 'YY',
      slides: [
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false)
      ]
    };

    slidesActions = {
      deleteSlide: jest.fn(),
      setAndUpdateActivity: jest.fn(),
      setAndUpdateTime: jest.fn()
    };

    metricActions = {
      createMetric: jest.fn()
    };

    unicornStore = {
      callouts: [new CalloutModel('', '', '', '', '', '')],
      setUploadsInProgress: jest.fn(),
      uploadsInProgress: false
    };

    subject = mount(
      <Provider
        unicornStore={unicornStore}
        slidesStore={slidesStore}
        unicornActions={unicornActions}
      >
        <SlideCard
          uploadStore={uploadStore}
          slideNumber={slideNumber}
          slideModel={slideModel}
          slidesActions={slidesActions}
          slidesStore={slidesStore}
          metricActions={metricActions}
          unicornStore={unicornStore}
        />
      </Provider>
    );
  });

  it('should render a thumbnail for each slide', () => {
    expect(subject.find('img')).toBeTruthy();
  });

  it('should render a title for each slide', () => {
    expect(subject.find('h5').text()).toBe('DD1234ZMONYY_TGT_NAME_NewActivity_ASSET_RELEASABILITY');
  });

  it('should have an activity input', () => {
    subject.find('#activityInput').at(0).simulate('change', {target: {value: 'test Activity'}});
    expect(slidesActions.setAndUpdateActivity).toHaveBeenCalled();
  });

  it('should render an input for the time', () => {
    subject.find('#timeInput').at(0).simulate('change', {target: {value: '1425'}});
    expect(slidesActions.setAndUpdateTime).toHaveBeenCalled();
  });

  it('should render the correct title', async () => {
    expect(subject.find('.card-title').text()).toContain('NewActivity');
  });

  it('should render a counter for each thumbnail', () => {
    expect(subject.find('.slideCounter').text()).toBe('3 of 5');
  });

  it('should render a delete icon only while fritz is not uploading to unicorn', () => {
    expect(subject.find('.deleteIcon').exists()).toBeTruthy();
    unicornStore.uploadsInProgress = true;
    subject = mount(
      <Provider
        unicornStore={unicornStore}
        slidesStore={slidesStore}
        unicornActions={unicornActions}
      >
        <SlideCard
          uploadStore={uploadStore}
          slideNumber={slideNumber}
          slideModel={slideModel}
          slidesActions={slidesActions}
          slidesStore={slidesStore}
          metricActions={metricActions}
          unicornStore={unicornStore}
        />
      </Provider>);
    expect(subject.find('.deleteIcon').exists()).toBeFalsy();
  });

  it('should flag slide as deleted when the delete icon is clicked and have an undo button', () => {
    expect(subject.find('.deleteIcon').simulate('click'));
    expect(slidesActions.deleteSlide).toHaveBeenCalled();
  });

  it('should contain a callout component', () => {
    expect(subject.find(StyledCallout).exists()).toBeTruthy();
  });
});