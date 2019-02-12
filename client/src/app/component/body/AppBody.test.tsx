import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppBody } from './AppBody';
import { FormContainer } from '../form/FormContainer';

describe('Header', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <AppBody/>
    );
  });

  it('should contain a form container', () => {
    expect(subject.find(FormContainer).exists).toBeTruthy();
  });
});