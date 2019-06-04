import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppBody } from './AppBody';
import { UploadStore } from '../form/upload/UploadStore';
import { StyledFormContainer } from '../form/FormContainer';
import { StyledSlidesContainer } from '../slides/container/SlidesContainer';
import { StyledSlidesContainerPlaceholder } from '../slides/container/SlidesContainerPlaceholder';
import { StyledProgressBar } from '../progressBar/ProgressBar';
import { StyledUploadContainer } from '../form/upload/container/UploadContainer';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { StyledUnicornUploadModal } from '../modals/UnicornUploadModal';

describe('Header', () => {
  let subject: ShallowWrapper;
  let uploadStore: UploadStore;
  let unicornStore: UnicornStore;

  beforeEach(() => {

    uploadStore = new UploadStore();
    unicornStore = new UnicornStore();

    uploadStore.setUploaded(true);

    subject = shallow(
      <AppBody
        uploadStore={uploadStore}
        unicornStore={unicornStore}
      />
    );
  });

  it('should contain a form container', () => {
    expect(subject.find(StyledFormContainer).exists).toBeTruthy();
  });

  it('should contain a slides container', () => {
    expect(subject.find(StyledSlidesContainer).exists).toBeTruthy();
  });

  it('should contain a slides container placeholder by default and then remove it when false', () => {
    expect(subject.find(StyledSlidesContainerPlaceholder).exists()).toBeTruthy();
    uploadStore.setPlaceholder(false);
    expect(subject.find(StyledSlidesContainerPlaceholder).exists()).toBeFalsy();
  });

  it('should render a progress bar on upload, default: not-rendered', () => {
    expect(subject.find(StyledProgressBar).exists()).toBeFalsy();
    uploadStore.setProcessing(true);
    expect(subject.find(StyledProgressBar).exists()).toBeTruthy();
  });

  it('should render the upload container', () => {
    expect(subject.find(StyledUploadContainer).exists()).toBeTruthy();
  });

  it('should show/hide a modal on unicorn upload', () => {
    unicornStore.setPendingUpload(true);
    expect(subject.find(StyledUnicornUploadModal).exists()).toBeTruthy();
    unicornStore.setPendingUpload(false);
    expect(subject.find(StyledUnicornUploadModal).exists()).toBeFalsy();
  });
});