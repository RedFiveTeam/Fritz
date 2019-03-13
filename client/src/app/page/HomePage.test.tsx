import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomePage } from './HomePage';
import { StyledFooter } from '../component/footer/Footer';
import { StyledAppBody } from '../component/body/AppBody';
import { StyledHomePageHeader } from '../component/header/HomePageHeader';

describe('HomePage', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<HomePage/>);
  });

  it('should have a body', () => {
    expect(subject.find(StyledAppBody).exists()).toBeTruthy();
  });

  it('should have a footer', () => {
    expect(subject.find(StyledFooter).exists()).toBeTruthy();
  });

  it('should have the hope page header', () => {
    expect(subject.find(StyledHomePageHeader).exists()).toBeTruthy();
  });

});