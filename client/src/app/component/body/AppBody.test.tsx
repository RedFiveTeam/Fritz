import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppBody } from './AppBody';
import { FormContainer } from '../form/FormContainer';
import { StyledProgressBar } from '../progressBar/ProgressBar';
import { UploadStore } from '../form/upload/UploadStore';
import { SlidesContainer } from '../slides/container/SlidesContainer';

describe('Header', () => {
  let subject: ShallowWrapper;
  let uploadStore: UploadStore;

  beforeEach(() => {
    uploadStore = new UploadStore();

    subject = shallow(
      <AppBody
        uploadStore={uploadStore}
      />
    );

  });

  it('should contain a form container', () => {
    expect(subject.find(FormContainer).exists).toBeTruthy();
  });

  it('should contain a slides container', () => {
    expect(subject.find(SlidesContainer).exists).toBeTruthy();
  });

  it('should render a progress bar on upload, default: not-rendered', () => {
    expect(subject.find(StyledProgressBar).exists()).toBeFalsy();
    uploadStore.setProcessing(true);
    expect(subject.find(StyledProgressBar).exists()).toBeTruthy();
  });

});