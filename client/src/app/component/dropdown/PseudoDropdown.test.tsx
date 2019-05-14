import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { PseudoDropdown } from './PseudoDropdown';

describe('PseudoDropdown', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<PseudoDropdown/>);
  });

  it('should contain a default message', () => {
    expect(subject.find('span').at(1).text()).toContain('no callouts');
  });

});