import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ExpandedView } from './ExpandedView';
import { SlideModel } from '../slides/SlideModel';
import { StyledCarousel } from './Carousel';

describe('ExpandedView', () => {
  let subject: ShallowWrapper;
  let slideStore: any;

  beforeEach(() => {
    slideStore = {
      slides: [
        new SlideModel('', 'DD1234ZMONYY_TGT_NAME_ACTIVITY_TEST_ASSET_CLASSIFICATION', '1234', 'Activity'),
        new SlideModel('', 'DD1234ZMONYY_TGT_NAME_ACTIVITY_TEST_ASSET_CLASSIFICATION', '1234', 'Activity')
      ],
      day: 'DD',
      month: 'MON',
      year: 'YY',
      asset: 'TEST_ASSET'
    };

    subject = shallow(
      <ExpandedView
        slidesStore={slideStore}
      />
    );
  });

  it('should render the styled carousel', () => {
    expect(subject.find(StyledCarousel).length).toBe(2);
  });

  it('should render the exit icon', () => {
    expect(subject.find('.exitExpand').exists()).toBeTruthy();
  });
});