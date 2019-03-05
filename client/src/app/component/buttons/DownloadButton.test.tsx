import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { DownloadButton } from './DownloadButton';

describe('DownloadButton', () => {
  let subject: ShallowWrapper;
  let slidesActions: any;
  let uploadStore: any;
  let slidesStore: any;

  slidesActions = {
    renameAndDownload: jest.fn()
  };

  slidesStore = {
    isValidName: () => {
      return true;
    },
    setValidate: () => {
      return;
    }
  };

  uploadStore = {
    uploaded: false
  };

  beforeEach(() => {
    subject = shallow(
      <DownloadButton
        slidesActions={slidesActions}
        uploadStore={uploadStore}
        slidesStore={slidesStore}
      />
    );
  });

  it('should render a button that renames and downloads on click', () => {
    uploadStore.uploaded = true;
    expect(subject.find('#downloadbutton').exists()).toBeTruthy();
    expect(subject.find('#downloadbutton').simulate('click'));
    expect(slidesActions.renameAndDownload).toHaveBeenCalled();
  });
});