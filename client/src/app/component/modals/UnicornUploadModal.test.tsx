import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UnicornUploadModal } from './UnicornUploadModal';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { SlidesStore } from '../slides/SlidesStore';

describe('UnicornUploadModal', () => {
  let subject: ShallowWrapper;
  let unicornStore: UnicornStore;
  let slidesStore: SlidesStore;
  let slidesActions: any;

  beforeEach(() => {
    unicornStore = new UnicornStore();
    slidesStore = new SlidesStore();

    slidesActions = {
      getAssignedCallouts: jest.fn()
    };

    subject = shallow(
      <UnicornUploadModal
        unicornStore={unicornStore}
        slidesActions={slidesActions}
        slidesStore={slidesStore}
      />
    );
  });

  it('should render icons and text', () => {
    expect(subject.find('.title').text()).toContain('Upload To Unicorn');
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
    expect(slidesStore.assignedCalloutCount).toBe(0);
    expect(unicornStore.pendingUpload).toBeFalsy();
    expect(unicornStore.uploadComplete).toBeFalsy();
  });
});