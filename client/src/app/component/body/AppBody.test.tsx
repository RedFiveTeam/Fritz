import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppBody } from './AppBody';
import { FormContainer } from '../form/FormContainer';
import { SlidesContainer } from '../slides/SlidesContainer';

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

  it('should contain a slides container', () => {
    expect(subject.find(SlidesContainer).exists).toBeTruthy();
  });
});