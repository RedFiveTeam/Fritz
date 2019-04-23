import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UnicornUploadButton } from './UnicornUploadButton';
import { SlideModel } from '../slides/SlideModel';

describe('UnicornUploadButton', () => {
  let subject: ShallowWrapper;
  let unicornActions: any;
  let slidesStore: any;

  beforeEach(() => {
    slidesStore = {
      slides: [new SlideModel('', '', '', '', false, '1'), new SlideModel('', '', '', '', false, '2')]
    };

    unicornActions = {
      buildUploadModel: jest.fn()
    };

    subject = shallow(
      <UnicornUploadButton
        unicornActions={unicornActions}
        slidesStore={slidesStore}
      />
    );
  });

  it('should call upload to unicorn on click', () => {
    subject.find('button').simulate('click');
    expect(unicornActions.buildUploadModel).toHaveBeenCalled();
  });
});