import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UnicornUploadButton } from './UnicornUploadButton';

describe('UnicornUploadButton', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;
  let slidesStore: any;
  let unicornActions: any;

  beforeEach(() => {

    unicornStore = {
      setPendingUpload: jest.fn(),
      setConfirmUploadStatus: jest.fn()
    };

    slidesStore = {
      differentAsset: false
    };

    unicornActions = {
      checkForUnassignedCallouts: jest.fn()
    };

    subject = shallow(
      <UnicornUploadButton
        unicornActions={unicornActions}
        unicornStore={unicornStore}
        slidesStore={slidesStore}
      />
    );
  });

  it('should render confirm upload modal', () => {
    subject.find('.uploadBtn').simulate('click');
    expect(unicornStore.setPendingUpload).toHaveBeenCalledWith(true);
    expect(unicornStore.setConfirmUploadStatus).toHaveBeenCalledWith(true);
    expect(unicornActions.checkForUnassignedCallouts).toHaveBeenCalled();
  });
});