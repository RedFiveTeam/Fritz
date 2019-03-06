import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { SlideCard } from './SlideCard';

describe('SlideCard', () => {
  let subject: ReactWrapper;
  let slideNumber: any;
  let slideName: string = 'Test Slide';
  let slideModel: any;

  beforeEach(() => {
    subject = mount(
      <SlideCard
        slideNumber={slideNumber}
        slideName={slideName}
        slideModel={slideModel}
      />
    );
  });

  it('should render a thumbnail for each slide', () => {
    expect(subject.find('img')).toBeTruthy();
  });

  it('should render a title for each slide', () => {
    expect(subject.find('h5').text()).toBe('Test Slide');
  });
});