import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ProgressBar } from './ProgressBar';
import { UploadStore } from '../form/upload/UploadStore';

describe('ProgressBar', () => {
  let subject: ShallowWrapper;
  let uploadStore: UploadStore;

  beforeEach(() => {

    uploadStore = new UploadStore();

    subject = shallow(
      <ProgressBar
        uploadStore={uploadStore}
      />
    );
  });

  it('should show a progress/total', () => {
    uploadStore.setTotal(3);
    uploadStore.setProgress(1);
    expect(subject.find('#status').text()).toBe('1/3 Images Converted');
  });
});
