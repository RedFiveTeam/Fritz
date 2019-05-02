import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UnicornUploadButton } from './UnicornUploadButton';

describe('UnicornUploadButton', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;
  let slidesStore: any;

  beforeEach(() => {

    unicornStore = {
      setPendingUpload: jest.fn(),
      setConfirmUploadStatus: jest.fn()
    };

    slidesStore = {
      differentAsset: false
    };

    subject = shallow(
      <UnicornUploadButton
        unicornStore={unicornStore}
        slidesStore={slidesStore}
      />
    );
  });

  it('should render confirm upload modal', () => {
    subject.find('.uploadBtn').simulate('click');
    expect(unicornStore.setPendingUpload).toHaveBeenCalled();
  });
});