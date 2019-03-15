import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { SlideCard } from './SlideCard';
import { SlideModel } from '../SlideModel';

describe('SlideCard', () => {
  let subject: ReactWrapper;
  let slideNumber: any;
  let slideModel = new SlideModel('', 'NewTestName', 'NewTime', 'NewActivity');
  let slidesActions: any;
  let slidesStore: any;

  beforeEach(() => {
    slidesStore = {
      slides: jest.fn()
    };

    slidesActions = {
      setAndUpdateActivity: jest.fn()
    };

    subject = mount(
      <SlideCard
        slideNumber={slideNumber}
        slideModel={slideModel}
        slidesActions={slidesActions}
        slidesStore={slidesStore}
      />
    );
  });

  it('should render a thumbnail for each slide', () => {
    expect(subject.find('img')).toBeTruthy();
  });

  it('should render a title for each slide', () => {
    expect(subject.find('h5').text()).toBe('DDNewTimeZMONYY_TGT_NAME_NewActivity_ASSET_CLASSIFICATION');
  });

  it('should have an activity input', () => {
    subject.find('#activityInput').at(0).simulate('change', {target: {value: 'test Activity'}});
    expect(slidesActions.setAndUpdateActivity).toHaveBeenCalled();
  });

  it('should render the correct title', async () => {
    expect(subject.find('.card-title').text()).toContain('NewActivity');
  });
});