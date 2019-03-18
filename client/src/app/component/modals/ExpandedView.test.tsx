import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { ExpandedView } from './ExpandedView';
import { SlideModel } from '../slides/SlideModel';

describe('ExpandedView', () => {
  let subject: ReactWrapper;
  let slideStore: any;

  beforeEach(() => {
    slideStore = {
      slides: [new SlideModel('', 'DD1234ZMONYY_TGT_NAME_ACTIVITY_TEST_ASSET_CLASSIFICATION', '1234', 'Activity')],
      day: 'DD',
      month: 'MON',
      year: 'YY',
      asset: 'TEST_ASSET'
    };

    subject = mount(
      <ExpandedView
        slidesStore={slideStore}
      />
    );
  });

  it('should render the correct title', () => {
    expect(subject.find('.slide').at(0).text()).toContain('DD1234ZMONYY_TGT_NAME_Activity_TEST_ASSET_CLASSIFICATION');
  });

  it('should render the correct image', () => {
    expect(subject.find('img').getDOMNode().getAttribute('src')).toBe('/api/image/0');
  });
});