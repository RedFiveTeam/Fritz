import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomePage } from './HomePage';
import { StyledFooter } from '../component/footer/Footer';
import { StyledAppBody } from '../component/body/AppBody';
import { StyledClassificationBanner } from '../component/classification/ClassificationBanner';

describe('HomePage', () => {
  let subject: ShallowWrapper;
  let classificationStore: any;
  let classificationActions: any;

  beforeEach(() => {
    classificationStore = {
      classification: 'UNCLASS'
    };

    classificationActions = {
      initializeStore: jest.fn()
    };

    subject = shallow(
      <HomePage
        classificationStore={classificationStore}
        classificationActions={classificationActions}
      />);
  });

  it('should have a body', () => {
    expect(subject.find(StyledAppBody).exists()).toBeTruthy();
  });

  it('should have a footer', () => {
    expect(subject.find(StyledFooter).exists()).toBeTruthy();
  });

  it('should contain a classification banner', () => {
    expect(subject.find(StyledClassificationBanner).exists()).toBeTruthy();
  });

});