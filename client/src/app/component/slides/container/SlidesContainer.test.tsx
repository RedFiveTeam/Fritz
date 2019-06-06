import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SlidesContainer } from './SlidesContainer';
import { SlidesStore } from '../store/SlidesStore';
import { SlideModel } from '../models/SlideModel';
import { StyledSlideCard } from '../slideCard/SlideCard';
import { StyledUndoDeleteContainer } from '../../UndoDelete/UndoDeleteContainer';

describe('SlidesContainer', () => {
  let subject: ShallowWrapper;
  let slidesStore: SlidesStore;
  let slideModel1: SlideModel;
  let slideModel2: SlideModel;
  let slideModel3: SlideModel;

  beforeEach(() => {
    slidesStore = new SlidesStore();
    slideModel1 = new SlideModel('oldName1', 'newName1');
    slideModel2 = new SlideModel('oldName2', 'newName2');
    slideModel3 = new SlideModel('oldName3', 'newName3');
    slideModel1.setTime('');
    slidesStore.setSlides([slideModel1, slideModel2, slideModel3]);

    subject = shallow(
      <SlidesContainer
        slidesStore={slidesStore}
      />
    );
  });

  it('should render a list of image files', async () => {
    await expect(subject.find(StyledSlideCard).length).toBe(3);
  });

  it('should render the undo container when a slide is deleted', () => {
    expect(subject.find(StyledUndoDeleteContainer).length).toBe(0);
    slideModel1.setDeleted(true);
    expect(subject.find(StyledUndoDeleteContainer).length).toBe(1);
  });

  it('should tag the first slide card', () => {
    expect(subject.find(StyledSlideCard).at(0).prop('first')).toBeTruthy();
  });
});