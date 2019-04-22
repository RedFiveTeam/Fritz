import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { StyledDropdown } from './Dropdown';

describe('Dropdown', () => {
  let subject: ReactWrapper;
  let unicornStore: any;

  beforeEach(() => {

    unicornStore = {
      setSelectedSite: jest.fn()
    };

    subject = mount(
      <StyledDropdown
        unicornStore={unicornStore}
        options={['DGS 1', 'DGS 2', 'DGS 3', 'DGS 4', 'DGS 5']}
      />
    );
  });

  it('should contain a list of options', () => {
    expect(subject.find('.ddd').length).toBe(5);
  });

  it('should update the store on selecting an option', () => {
    subject.find('.ddd').at(3).simulate(
      'click',
      { target: {classList: { add: () => { return; }}, dataset: { option: 'DGS 3'}}});
    expect(unicornStore.setSelectedSite).toHaveBeenCalledWith('DGS 3');
  });

});