import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { DatePicker } from './DatePicker';
import { SlideModel } from '../slides/models/SlideModel';

describe('DatePicker', () => {
  let subject: ShallowWrapper;
  let slide: SlideModel;

  beforeEach(() => {

    slide = new SlideModel();
    slide.setDate(new Date(2019, 5, 10));

    subject = shallow(
      <DatePicker
        slide={slide}
      />
    );
  });

  it('should contain two arrow icons and display the selected date', () => {
    expect(subject.find('.upArrow').exists()).toBeTruthy();
    expect(subject.find('.downArrow').exists()).toBeTruthy();
    expect(subject.find('.selectedDate').exists()).toBeTruthy();
  });

  it('should display the autofilled date', () => {
    expect(subject.find('.selectedDate').text()).toBe('10 Jun');
  });

  it('should increment the date when the up arrow is clicked and set dated edited to true', () => {
    subject.find('.upArrow').simulate('click');
    expect(subject.find('.selectedDate').text()).toBe('11 Jun');
    expect(slide.dateEdited).toBeTruthy();
  });

  it('should decrement the date when the down arrow is clicked and set dated edited to true', () => {
    subject.find('.downArrow').simulate('click');
    expect(subject.find('.selectedDate').text()).toBe('9 Jun');
    expect(slide.dateEdited).toBeTruthy();
  });
});