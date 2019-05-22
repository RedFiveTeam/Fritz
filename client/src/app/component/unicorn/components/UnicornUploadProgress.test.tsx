import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UnicornUploadProgress } from './UnicornUploadProgress';

describe('UnicornUploadProgress', () => {
  let subject: ShallowWrapper;
  let slidesStore: any;
  let unicornStore: any;

  beforeEach(() => {
    slidesStore = {
      assignedCalloutCount: 4
    };

    unicornStore = {
      currentUploadCount: 2
    };

    subject = shallow(
      <UnicornUploadProgress
        slidesStore={slidesStore}
        unicornStore={unicornStore}
      />
    );
  });

  it('should display the current total uploaded and the total amount to be uploaded', () => {
    expect(subject.text()).toMatch(/2.*of.*4 images uploaded/);
  });
});