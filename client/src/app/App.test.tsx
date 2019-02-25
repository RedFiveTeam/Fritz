import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { App } from './App';
import { StyledAppBody } from './component/body/AppBody';

describe('App', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<App/>);
  });

  it('should have a body', () => {
    expect(subject.find(StyledAppBody).exists()).toBeTruthy();
  });

});