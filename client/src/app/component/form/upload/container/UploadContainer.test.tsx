import * as React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { UploadContainer } from './UploadContainer';
import { UploadModel } from '../UploadModel';
import { UploadStore } from '../UploadStore';

describe('UploadContainer', () => {
  let subject: ReactWrapper;
  let uploadActions: any;
  let uploadStore: any;

  beforeEach(() => {
    uploadActions = {
      upload: () => {
        return new UploadModel('chucknorris.ppt');
      }
    };
    uploadStore = new UploadStore();
    subject = mount(
      <UploadContainer
        uploadActions={uploadActions}
        uploadStore={uploadStore}
      />
    );
  });

  it('should contain an upload box and button', () => {
    expect(subject.find('#uploadButton').exists()).toBeTruthy();
  });

  it('should change the display after file uploaded', () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.ppt', {type: 'application/vnd.ms-powerpoint'});
    subject.find('#uploadButton').simulate(
      'change',
      {
        preventDefault: () => {
          return;
        },
        dataTransfer: {files: [file]}
      });
    uploadStore.setUploaded(true);
    uploadStore.setFileName(file.name);
    subject.update();
    expect(subject.find('#uploadButton').exists()).toBeFalsy();
    expect(subject.find('#pptIcon').exists()).toBeTruthy();
    expect(subject.find('#pptName').text()).toBe(file.name);
  });

});