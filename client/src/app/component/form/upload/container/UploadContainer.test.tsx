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
        return new UploadModel('chucknorris.jpg');
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
});