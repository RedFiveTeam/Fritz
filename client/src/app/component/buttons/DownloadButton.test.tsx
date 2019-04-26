import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { DownloadButton } from './DownloadButton';
import { UploadStore } from '../form/upload/UploadStore';

describe('DownloadButton', () => {
  let subject: ShallowWrapper;
  let slidesActions: any;
  let uploadStore: UploadStore;
  let slidesStore: any;

  slidesActions = {
    trackRenameAndDownload: jest.fn()
  };

  slidesStore = {
    isValidName: () => {
      return true;
    },
    isValidDate: () => {
      return true;
    },
    setValidate: () => {
      return;
    }
  };

  uploadStore = new UploadStore();

  beforeEach(() => {
    subject = shallow(
      <DownloadButton
        slidesActions={slidesActions}
        uploadStore={uploadStore}
        slidesStore={slidesStore}
      />
    );
  });

  it('should render a button that renames and downloads on click', async () => {
    await uploadStore.setUploaded(true);
    expect(subject.find('#downloadbutton').exists()).toBeTruthy();
    expect(subject.find('#downloadbutton').simulate('click'));
    expect(slidesActions.trackRenameAndDownload).toHaveBeenCalled();
  });
});