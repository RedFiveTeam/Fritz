import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { CarouselItem } from './CarouselItem';
import { SlideModel } from '../slides/models/SlideModel';
import { StyledValidatingInput } from '../input/ValidatingInput';
import Mock = jest.Mock;
import { SlidesStore } from '../slides/store/SlidesStore';

describe('CarouselItem', () => {
  let subject: ShallowWrapper;
  let slide: SlideModel;
  let changeTimeSpy: Mock;
  let changeActivitySpy: Mock;
  let slidesStore: SlidesStore;

  beforeEach(() => {
    slide = new SlideModel('imagePath', 'test Slide', '1234', 'TESTACTY', false, '', '');
    slide.setHash('hash');
    changeTimeSpy = jest.fn();
    changeActivitySpy = jest.fn();

    slidesStore = new SlidesStore();

    subject = shallow(
      <CarouselItem
        slide={slide}
        changeTime={changeTimeSpy}
        changeActivity={changeActivitySpy}
        slidesStore={slidesStore}
      />
    );
  });

  it('should display slide image', () => {
    expect(subject.find('img').prop('src')).toBe('api/image/hash/imagePath.jpg');
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
});