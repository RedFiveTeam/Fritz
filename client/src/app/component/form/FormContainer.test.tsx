import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FormContainer } from './FormContainer';
import { InjectedUploadContainer } from './upload/container/UploadContainer';

describe('FormContainer', () => {
  let subject: ShallowWrapper;
  let slidesActions: any;
  let slidesStore: any;
  let unicornStore: any;
  let unicornActions: any;

  beforeEach(() => {
    unicornStore = {
      releasabilities: []
    };

    unicornActions = {
      getReleasabilities: jest.fn()
    };

    slidesActions = {
      setAndUpdateDate: jest.fn(),
      setAndUpdateOpName: jest.fn(),
      setAndUpdateAsset: jest.fn(),
      setAndUpdateReleasability: jest.fn()
    };

    slidesStore = {
      setHelp: jest.fn()
    };

    subject = shallow(
      <FormContainer
        unicornStore={unicornStore}
        unicornActions={unicornActions}
        slidesActions={slidesActions}
        slidesStore={slidesStore}
      />);
  });

  it('should contain a date input that updates the header string when changed', () => {
    subject.find('#dateInput').simulate('change', {target: {value: '2018/05/12'}});
    expect(slidesActions.setAndUpdateDate).toHaveBeenCalledWith('MAY', '18', '12');
  });

  it('should contain an operation input that updates the header string when changed', () => {
    subject.find('#opInput').simulate('change', {target: {value: 'op superman'}});
    expect(slidesActions.setAndUpdateOpName).toHaveBeenCalledWith('op superman');
  });

  it('should contain an asset input that updates the header string when changed', () => {
    subject.find('#assetInput').simulate('change', {target: {value: 'flyguy'}});
    expect(slidesActions.setAndUpdateAsset).toHaveBeenCalledWith('flyguy');
  });

  it('should contain an upload container', () => {
    expect(subject.find(InjectedUploadContainer).exists()).toBeTruthy();
  });

  it('should display help menu icon and popup modal upon click', () => {
    subject.find('.helpMenuIcon').simulate('click');
    expect(slidesStore.setHelp).toHaveBeenCalledWith(true);
  });
});