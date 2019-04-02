import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SlidesContainer } from './SlidesContainer';
import { SlidesStore } from '../SlidesStore';
import { SlideModel } from '../SlideModel';
import { StyledSlideCard } from '../slideCard/SlideCard';
import { StyledUndoDeleteContainer } from '../../UndoDelete/UndoDeleteContainer';

describe('SlidesContainer', () => {
  let subject: ShallowWrapper;
  let slidesStore = new SlidesStore();
  let slideModel1 = new SlideModel('oldName1', 'newName1');
  let slideModel2 = new SlideModel('oldName2', 'newName2');
  let slideModel3 = new SlideModel('oldName3', 'newName3');

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

  it('should render the undo container when a slide is deleted', () => {
    expect(subject.find(StyledUndoDeleteContainer).length).toBe(0);
    slideModel1.setDeleted(true);
    expect(subject.find(StyledUndoDeleteContainer).length).toBe(1);
  });
});