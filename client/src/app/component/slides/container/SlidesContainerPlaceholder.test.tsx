import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SlidesContainerPlaceholder } from './SlidesContainerPlaceholder';

describe('SlidesContainerPlaceholder', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<SlidesContainerPlaceholder/>);
  });

  it('should render the svg', () => {
    expect(subject.find('.placeholderIcon').exists()).toBeTruthy();
  });

  it('should display the placeholder text', () => {
    expect(subject.find('p').text()).toContain('Fill out the form');
  });
});