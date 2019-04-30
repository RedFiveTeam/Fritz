import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UnicornUploadModal } from './UnicornUploadModal';

describe('UnicornUploadModal', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<UnicornUploadModal/>);
  });

  it('should render icons and text', () => {
    expect(subject.find('.title').text()).toContain('Upload To Unicorn');
    expect(subject.find('#flameIcon').exists()).toBeTruthy();
    expect(subject.find('.arrowGroup').exists()).toBeTruthy();
    expect(subject.find('#unicorn').exists()).toBeTruthy();
    expect(subject.find('.modalText').text()).toContain('One moment');
  });
});