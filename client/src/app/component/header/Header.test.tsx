import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Header } from './Header';

describe('Header', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <Header/>
    );
  });

  it('should contain a fritz header', () => {
    expect(subject.find('.logo').exists()).toBeTruthy();
  });
});