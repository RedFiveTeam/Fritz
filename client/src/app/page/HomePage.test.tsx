import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomePage } from './HomePage';
import { StyledHeader } from '../component/header/Header';
import { StyledFooter } from '../component/footer/Footer';
import { StyledAppBody } from '../component/body/AppBody';

describe('HomePage', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<HomePage/>);
  });

  it('should have a header', () => {
    expect(subject.find(StyledHeader).exists()).toBeTruthy();
  });

  it('should have a body', () => {
    expect(subject.find(StyledAppBody).exists()).toBeTruthy();
  });

  it('should have a footer', () => {
    expect(subject.find(StyledFooter).exists()).toBeTruthy();
  });

});