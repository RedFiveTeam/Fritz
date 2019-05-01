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

  beforeEach(() => {
    unicornStore = new UnicornStore();

    slidesStore = {
      slides: [new SlideModel('', '', '', '', false, '1'), new SlideModel('', '', '', '', false, '2')],
      assignedCalloutCount: 5,
      setAssignedCalloutCount: jest.fn()
    };

    unicornActions = {
      buildUploadModel: jest.fn()
    };

    slidesActions = {
      getAssignedCallouts: jest.fn()
    };

    subject = shallow(
      <UnicornUploadModal
        unicornStore={unicornStore}
        slidesActions={slidesActions}
        slidesStore={slidesStore}
        unicornActions={unicornActions}
      />
    );
  });

  it('should render upload confirmation modal upon upload button click', () => {
    unicornStore.setPendingUpload(true);
    unicornStore.setConfirmUploadStatus(true);
    expect(subject.find('.title').text()).toContain('Upload To Unicorn');
    expect(subject.find('#unicornConfirm').exists()).toBeTruthy();
    expect(subject.find('.cancelBtn').exists()).toBeTruthy();
    expect(subject.find('.confirmText').text()).toContain('5');
    subject.find('.confirmBtn').simulate('click');
    expect(unicornStore.confirmUploadStatus).toBeFalsy();
    expect(unicornActions.buildUploadModel).toHaveBeenCalled();
  });

  it('should render icons and text', () => {
    expect(subject.find('#flameIcon').exists()).toBeTruthy();
    expect(subject.find('.arrowGroup').exists()).toBeTruthy();
    expect(subject.find('#unicorn').exists()).toBeTruthy();
    expect(subject.find('.modalText').text()).toContain('One moment');
  });

  it('should render a complete status', () => {
    unicornStore.setUploadComplete(true);
    expect(subject.find('img').exists()).toBeTruthy();
    expect(subject.find('.createNewBtn').exists()).toBeTruthy();
    expect(subject.find('.returnBtn').exists()).toBeTruthy();
    expect(subject.find('.uploadStatus').text()).toContain('Upload Complete');
  });

  it('should return to project on click', () => {
    unicornStore.setUploadComplete(true);
    subject.find('.returnBtn').simulate('click');
    slidesStore.AssignedCalloutCount = 0;
    expect(subject.find('.returnBtn').exists()).toBeFalsy();
  });

  it('should refresh the page after clicking createNew', () => {
    unicornStore.setPendingUpload(true);
    unicornStore.setConfirmUploadStatus(true);
    subject.find('.confirmBtn').simulate('click');
    expect(unicornActions.buildUploadModel).toHaveBeenCalled();
    unicornStore.setUploadComplete(true);
    subject.find('.createNewBtn').simulate('click');

  });
});