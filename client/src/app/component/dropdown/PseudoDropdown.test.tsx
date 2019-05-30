import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { PseudoDropdown } from './PseudoDropdown';

describe('PseudoDropdown', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <PseudoDropdown
        label={'button text'}
        message={'given message'}
      />
    );
  });

  it('should display a button with given text', () => {
    expect(subject.find('button').text()).toContain('button text');
  });

  it('should display a given message on click', () => {
    expect(subject.text()).toContain('given message');
  });

});