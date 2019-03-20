import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UploadProgressContainer } from './UploadProgressContainer';

describe('UploadProgressContainer', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<UploadProgressContainer/>);
  });

  it('should have an upload icon', () => {
    expect(subject.find('img').exists()).toBeTruthy();
  });

  it('should render placeholder text', () => {
    expect(subject.find('.uploadingText').text()).toContain('Please give us a moment');
  });

});