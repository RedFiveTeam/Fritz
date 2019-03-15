import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomePageHeader } from './HomePageHeader';

describe('HomePageHeader', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<HomePageHeader/>);
  });

  it('should render a Renamer header section', () => {
    expect(subject.find('h2').at(0).text()).toBe('JPEG Renamer - Details');
  });

  it('should render a JPEG Preview header section', () => {
    expect(subject.find('h2').at(1).text()).toBe('JPEG Previews');
  });
});