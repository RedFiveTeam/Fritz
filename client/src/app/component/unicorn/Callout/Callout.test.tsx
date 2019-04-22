import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Callout } from './Callout';
import { StyledDropdown } from '../../dropdown/Dropdown';
import { SlideModel } from '../../slides/SlideModel';

describe('Callout', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;

  beforeEach(() => {
    unicornStore = {
      callouts: []
    };

    subject = shallow(
      <Callout
        unicornStore={unicornStore}
        slide={new SlideModel()}
      />);
  });

  it('should contain a dropdown of callouts', () => {
    expect(subject.find(StyledDropdown).exists()).toBeTruthy();
  });

});