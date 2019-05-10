import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { StyledDropdown } from './Dropdown';

describe('Dropdown', () => {
  let subject: ReactWrapper;
  let fakeFunction: any;

  beforeEach(() => {
    fakeFunction = jest.fn();

    subject = mount(
      <StyledDropdown
        options={['DGS 1', 'DGS 2', 'DGS 3', 'DGS 4', 'DGS 5']}
        defaultValue="Test"
        callback={(s: any) => {
          fakeFunction(s);
        }}
      />
    );
  });

  it('should contain a list of options', () => {
    expect(subject.find('.ddd').length).toBe(5);
  });

  it('should execute a callback on selecting an option', () => {
    subject.find('.ddd').at(3).simulate(
      'click',
      {
        target: {
          classList: {
            add: () => {
              return;
            }
          }, dataset: {option: 'DGS 3'}
        }
      });
    expect(fakeFunction).toHaveBeenCalledWith('DGS 3');
  });
});