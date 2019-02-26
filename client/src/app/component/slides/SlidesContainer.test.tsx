import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SlidesContainer } from './SlidesContainer';
import { SlidesStore } from './SlidesStore';

describe('SlidesContainer', () => {
  let subject: ShallowWrapper;
  let slidesStore = new SlidesStore();

  slidesStore.setAsset('nOne');
  slidesStore.setDate('14TTTTZFEB19');
  slidesStore.setClassification('secret');
  slidesStore.setOpName('op HELLO');
  slidesStore.setFiles(['file1.png', 'file2.png', 'file3.png']);

  beforeEach(() => {
    subject = shallow(
      <SlidesContainer
        slidesStore={slidesStore}
      />
    );
  });

  it('should render a list of image files', () => {
    expect(subject.find('.slide').length).toBe(3);
  });

  it('should render a list of files in the correct format', () => {
    expect(subject.find('.slide').at(0).text()).toBe('14TTTTZFEB19_TGT_OP_HELLO_ACTIVITY_NONE_SECRET');
  });

});