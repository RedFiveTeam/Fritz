import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SlidesContainer } from './SlidesContainer';

describe('SlidesContainer', () => {
  let subject: ShallowWrapper;
  let slidesStore: any;

  slidesStore = {
    files: ['file1.png', 'file2.png', 'file3.png']
  };

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

});