import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FormContainer } from './FormContainer';
import { StyledValidatingInput } from '../input/ValidatingInput';
import { StyledValidatingDropdown } from '../dropdown/ValidatingDropdown';
import { SlidesStore } from '../slides/store/SlidesStore';

describe('FormContainer', () => {
  let subject: ShallowWrapper;
  let slidesActions: any;
  let slidesStore: SlidesStore;
  let unicornStore: any;
  let unicornActions: any;
  let uploadActions: any;

  beforeEach(() => {
    unicornStore = {
      releasabilities: [],
      setOffline: jest.fn(),
      offline: jest.fn()
    };

    unicornActions = {
      getReleasabilities: jest.fn()
    };

    slidesActions = {
      setDateFromInput: jest.fn(),
      setAndUpdateOpName: jest.fn(),
      setAndUpdateAsset: jest.fn(),
      setAndUpdateReleasability: jest.fn(),
      setAndUpdateCustomReleasability: jest.fn()
    };

    slidesStore = new SlidesStore();

    subject = shallow(
      <FormContainer
        unicornStore={unicornStore}
        unicornActions={unicornActions}
        slidesActions={slidesActions}
        slidesStore={slidesStore}
        uploadActions={uploadActions}
      />);
  });

  it('should display a date after store change', () => {
    expect(subject.find(StyledValidatingInput).at(0).props().value).toBe('mm/dd/yyyy');
    slidesStore.setFullDate('2000-02-02');
    expect(subject.find(StyledValidatingInput).at(0).props().value).toBe('2000-02-02');
  });

  it('should contain fields for Date, Op Name, Callsign, Classification, and Releasability', () => {
    unicornStore.offline = false;
    subject.instance().forceUpdate();
    expect(subject.find(StyledValidatingInput).length).toBe(3);
    expect(subject.find('.classification').exists()).toBeTruthy();
    expect(subject.find(StyledValidatingDropdown).length).toBe(1);
  });

  it('should display a different releasability input when offline ', () => {
    unicornStore.offline = true;
    expect(subject.find('#releasabilityInput').exists()).toBeTruthy();
    expect(subject.find('#releasabilityDropdown').exists()).toBeFalsy();
    unicornStore.offline = false;
    subject.instance().forceUpdate();
    expect(subject.find('#releasabilityInput').exists()).toBeFalsy();
    expect(subject.find('#releasabilityDropdown').exists()).toBeTruthy();
  });
});