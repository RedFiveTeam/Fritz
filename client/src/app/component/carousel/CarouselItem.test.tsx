import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { CarouselItem } from './CarouselItem';
import { SlideModel } from '../slides/models/SlideModel';
import { StyledValidatingInput } from '../input/ValidatingInput';
import { SlidesStore } from '../slides/store/SlidesStore';
import { StyledDatePicker } from '../date/DatePicker';
import Mock = jest.Mock;

describe('CarouselItem', () => {
  let subject: ReactWrapper;
  let slide: SlideModel;
  let changeTimeSpy: Mock;
  let changeActivitySpy: Mock;
  let slidesStore: SlidesStore;
  let carouselActions: any;

  let mountFirst = () => {
    subject = mount(
      <CarouselItem
        active={true}
        slide={slide}
        changeTime={changeTimeSpy}
        changeActivity={changeActivitySpy}
        slidesStore={slidesStore}
        carouselActions={carouselActions}
      />
    );
  };

  beforeEach(() => {
    slide = new SlideModel('imagePath', 'test Slide', '1234', 'TESTACTY', false, '', '');
    slide.setHash('hash');
    changeTimeSpy = jest.fn();
    changeActivitySpy = jest.fn();

    slidesStore = new SlidesStore();
    slide.setDate(new Date(Date.now()));

    subject = mount(
      <CarouselItem
        slide={slide}
        changeTime={changeTimeSpy}
        changeActivity={changeActivitySpy}
        slidesStore={slidesStore}
        carouselActions={carouselActions}
      />
    );
  });

  it('should display slide image', () => {
    expect(subject.find('img').at(0).prop('src')).toBe('api/image/hash/imagePath');
  });

  it('should display a time input', () => {
    expect(subject.find(StyledValidatingInput).exists()).toBeTruthy();
  });

  it('should display an activity input', () => {
    expect(subject.find('#activityInput').exists()).toBeTruthy();
  });

  it('should display the callout dropdown', () => {
    expect(subject.find('.calloutDropdown').exists()).toBeTruthy();
  });

  it('should display the image name', () => {
    expect(subject.find('.slideTitle').text()).toBe('DD1234ZMONYY_TGT_NAME_TESTACTY_ASSET_RELEASABILITY');
  });

  it('should display the current slide number out of the total slide count', () => {
    expect(subject.find('.slideCount').exists()).toBeTruthy();
  });

  it('should display a date picker that increments or decrements the date', () => {
    expect(subject.find(StyledDatePicker).exists()).toBeTruthy();
  });

  it('should focus on the time input if empty', () => {
    slide.setTime('');
    mountFirst();
    let timeInput = subject.find('input').at(0).instance();
    expect(timeInput).toBe(document.activeElement);
  });

  it('should focus on the activity input if the time input is valid', () => {
    slide.setTime('1234');
    mountFirst();
    let activityInput = subject.find('input').at(1).instance();
    expect(activityInput).toBe(document.activeElement);
  });
});