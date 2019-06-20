import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { SlideCard } from './SlideCard';
import { Provider } from 'mobx-react';
import { StyledCalloutDropdown } from '../../unicorn/Callout/CalloutDropdown';
import { CalloutModel } from '../../unicorn/model/CalloutModel';
import { SlideModel } from '../models/SlideModel';
import Mock = jest.Mock;
import { StyledValidatingInput } from '../../input/ValidatingInput';
import { StyledSlideName } from '../SlideTitle';
import * as moment from 'moment';

describe('SlideCard', () => {
  let subject: ReactWrapper;
  let slideNumber: any;
  let slideModel: SlideModel;
  let slidesActions: any;
  let slidesStore: any;
  let uploadStore: any;
  let metricActions: any;
  let unicornStore: any;
  let unicornActions: any;
  let thumbnailClickSpy: Mock;

  let mountFirst = () => {
    subject = mount(
      <Provider
        unicornStore={unicornStore}
        slidesStore={slidesStore}
        unicornActions={unicornActions}
        slidesActions={slidesActions}
        uploadStore={uploadStore}
      >
        <SlideCard
          uploadStore={uploadStore}
          slideNumber={slideNumber}
          slide={slideModel}
          slidesActions={slidesActions}
          slidesStore={slidesStore}
          metricActions={metricActions}
          unicornStore={unicornStore}
          thumbnailClick={thumbnailClickSpy}
          first={true}
        />
      </Provider>);
  };

  beforeEach(() => {
    thumbnailClickSpy = jest.fn();

    slideModel = new SlideModel('', 'NewTestName', '1234', 'NewActivity');
    slideModel.setDate(moment('2019-06-14'));
    uploadStore = {
      hash: 'ljndslkm'
    };

    slideNumber = 2;

    slidesStore = {
      slides: [
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false)
      ],
      undeletedSlides: [
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
      setAndUpdateTime: jest.fn(),
      isEditable: true
    };

    metricActions = {
      createMetric: jest.fn()
    };

    unicornStore = {
      callouts: [new CalloutModel('', '', '', '', '', '', null)],
      setUploadsInProgress: jest.fn(),
      uploadsInProgress: false
    };

    subject = mount(
      <Provider
        unicornStore={unicornStore}
        slidesStore={slidesStore}
        unicornActions={unicornActions}
        slidesActions={slidesActions}
      >
        <SlideCard
          uploadStore={uploadStore}
          slideNumber={slideNumber}
          slide={slideModel}
          slidesActions={slidesActions}
          slidesStore={slidesStore}
          metricActions={metricActions}
          unicornStore={unicornStore}
          thumbnailClick={thumbnailClickSpy}
        />
      </Provider>
    );
  });

  it('should render a thumbnail for each slide', () => {
    expect(subject.find('img')).toBeTruthy();
  });

  it('should render a title for each slide', () => {
    expect(subject.find(StyledSlideName).exists()).toBeTruthy();
  });

  it('should have an activity input', () => {
    subject.find('.activityInput').find('input').at(0).simulate('change', {target: {value: 'test Activity'}});
    expect(slidesActions.setAndUpdateActivity).toHaveBeenCalled();
  });

  it('should render an input for the time', () => {
    expect(subject.find(StyledValidatingInput).exists()).toBeTruthy();
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
        slidesActions={slidesActions}
        uploadStore={uploadStore}
      >
        <SlideCard
          uploadStore={uploadStore}
          slideNumber={slideNumber}
          slide={slideModel}
          slidesActions={slidesActions}
          slidesStore={slidesStore}
          metricActions={metricActions}
          unicornStore={unicornStore}
          thumbnailClick={thumbnailClickSpy}
        />
      </Provider>);
    expect(subject.find('.deleteIcon').exists()).toBeFalsy();
  });

  it('should flag slide as deleted when the delete icon is clicked and have an undo button', () => {
    expect(subject.find('.deleteIcon').simulate('click'));
    expect(slidesActions.deleteSlide).toHaveBeenCalled();
  });

  it('should contain a callout component', () => {
    expect(subject.find(StyledCalloutDropdown).exists()).toBeTruthy();
  });

  it('should display the uploading style when Fritz is uploading to unicorn', () => {
    expect(subject.find('.whileUploading').exists()).toBeFalsy();
    slideModel.setUploading(true);
    subject.update();
    expect(subject.find('.whileUploading').exists()).toBeTruthy();
  });

  it('should display the carousel on thumbnail click', () => {
    subject.find('.calloutImage').simulate('click');
    expect(thumbnailClickSpy).toHaveBeenCalled();
  });

  it('should focus on the time box when it is the first slide card and empty or invalid', () => {
    slideModel.setTime('');
    mountFirst();
    let timeInput = subject.find('input').at(0).instance();
    expect(timeInput).toBe(document.activeElement);

    slideModel.setTime('aaa');
    mountFirst();
    timeInput = subject.find('input').at(0).instance();
    expect(timeInput).toBe(document.activeElement);

    slideModel.setTime('1234');
    mountFirst();
    timeInput = subject.find('input').at(0).instance();
    expect(timeInput).not.toBe(document.activeElement);
  });

  it('should focus on the time box when it is the first slide card and empty or invalid', () => {
    slideModel.setTime('');
    mountFirst();
    let timeInput = subject.find('input').at(0).instance();
    expect(timeInput).toBe(document.activeElement);

    slideModel.setTime('aaa');
    mountFirst();
    timeInput = subject.find('input').at(0).instance();
    expect(timeInput).toBe(document.activeElement);

    slideModel.setTime('1234');
    mountFirst();
    timeInput = subject.find('input').at(0).instance();
    expect(timeInput).not.toBe(document.activeElement);
  });

  it('should focus on the first activity box if the time box is full', () => {
    slideModel.setTime('1234');
    mountFirst();
    let activityInput = subject.find('input').at(1).instance();
    expect(activityInput).toBe(document.activeElement);
  });
});