import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UnicornUploadButton } from './UnicornUploadButton';

describe('UnicornUploadButton', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;

  beforeEach(() => {
    unicornStore = {
      setPendingUpload: jest.fn(),
      setConfirmUploadStatus: jest.fn()
    };

    subject = shallow(
      <UnicornUploadButton
        unicornStore={unicornStore}
      />
    );
  });

  it('should render confirm upload modal', () => {
    subject.find('.uploadBtn').simulate('click');
    expect(unicornStore.setPendingUpload).toHaveBeenCalled();
  });
});