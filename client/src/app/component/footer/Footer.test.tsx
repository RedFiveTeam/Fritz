import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Footer } from './Footer';
import { StyledUnicornUploadButton } from '../buttons/UnicornUploadButton';
import { StyledDownloadButton } from '../buttons/DownloadButton';

describe('Footer', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<Footer/>);
  });

  it('should have a download button', () => {
    expect(subject.find(StyledDownloadButton).exists()).toBeTruthy();
  });

  it('should have a unicorn upload button', () => {
    expect(subject.find(StyledUnicornUploadButton).exists()).toBeTruthy();
  });
});