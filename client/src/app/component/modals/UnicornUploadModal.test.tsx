import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UnicornUploadModal } from './UnicornUploadModal';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { SlideModel } from '../slides/SlideModel';

describe('UnicornUploadModal', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;
  let slidesStore: any;
  let slidesActions: any;
  let unicornActions: any;
  let metricActions: any;

  beforeEach(() => {
    unicornStore = new UnicornStore();

    slidesStore = {
      slides: [new SlideModel('', '', '', '', false, '1'), new SlideModel('', '', '', '', false, '2')],
      assignedCalloutCount: 5,
      setAssignedCalloutCount: jest.fn()
    };

    unicornActions = {
      buildUploadModel: jest.fn(),
      startUploading: jest.fn()
    };

    slidesActions = {
      getAssignedCallouts: jest.fn()
    };

    metricActions = {
      trackMetric: jest.fn(),
      updateMetric: jest.fn(),
      createMetric: jest.fn()
    };

    subject = shallow(
      <UnicornUploadModal
        unicornStore={unicornStore}
        slidesActions={slidesActions}
        slidesStore={slidesStore}
        unicornActions={unicornActions}
        metricActions={metricActions}
      />
    );
  });

  it('should render upload confirmation modal upon upload button click', async () => {
    unicornStore.setPendingUpload(true);
    unicornStore.setConfirmUploadStatus(true);
    expect(subject.find('.title').text()).toContain('Upload To Unicorn');
    expect(subject.find('#unicornConfirm').exists()).toBeTruthy();
    expect(subject.find('.cancelBtn').exists()).toBeTruthy();
    expect(subject.find('.confirmText').text()).toContain('5');
    await subject.find('.confirmBtn').simulate('click');
    expect(metricActions.trackMetric).toHaveBeenCalledWith('UploadToUnicorn');
    expect(unicornStore.confirmUploadStatus).toBeFalsy();
    expect(unicornActions.startUploading).toHaveBeenCalled();
  });

  it('should display some info if there are unassigned callouts', () => {
    unicornStore.setUnassignedCallouts(true);
    expect(subject.find('.unassignedMessage').text()).toContain('The following images');
    subject.find('.confirmBtn').simulate('click');
    expect(unicornStore.unassignedCallouts).toBeFalsy();
    expect(unicornStore.confirmUploadStatus).toBeFalsy();
  });
});