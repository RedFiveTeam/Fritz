import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SlidesContainer } from './SlidesContainer';
import { SlidesStore } from '../SlidesStore';
import { SlideModel } from '../SlideModel';
import { StyledSlideCard } from '../slideCard/SlideCard';

describe('SlidesContainer', () => {
  let subject: ShallowWrapper;
  let slidesStore = new SlidesStore();
  let slideModel1 = new SlideModel('oldName1', 'newName1');
  let slideModel2 = new SlideModel('oldName2', 'newName2');
  let slideModel3 = new SlideModel('oldName3', 'newName3');

  slidesStore.setAsset('nOne');
  slidesStore.setDate('14TTTTZFEB19');
  slidesStore.setClassification('secret');
  slidesStore.setOpName('op HELLO');
  slidesStore.setSlides([slideModel1, slideModel2, slideModel3]);

  beforeEach(() => {
    subject = shallow(
      <SlidesContainer
        slidesStore={slidesStore}
      />
    );
  });

  it('should render a list of image files', async () => {
    await expect(subject.find(StyledSlideCard).length).toBe(3);
  });

  it('should render a list of files in the correct format', async () => {
    expect(subject.find(StyledSlideCard).at(0).prop('slideName').props.children[2]).toContain('ZFEB19_OP_HELLO_');
  });
});