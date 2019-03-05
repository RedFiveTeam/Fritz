import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FormContainer } from './FormContainer';
import { InjectedUploadContainer } from './UploadContainer';
import { SlidesStore } from '../slides/SlidesStore';

describe('FormContainer', () => {
  let subject: ShallowWrapper;
  let slidesActions: any;
  let slidesStore: SlidesStore;

  slidesActions = {
    setAndUpdateDate: jest.fn(),
    setAndUpdateOpName: jest.fn(),
    setAndUpdateAsset: jest.fn(),
    setAndUpdateClassification: jest.fn()
  };

  slidesStore = new SlidesStore();

  beforeEach(() => {
    subject = shallow(
      <FormContainer
        slidesActions={slidesActions}
        slidesStore={slidesStore}
      />);
  });

  it('should contain a date input that updates the header string when changed', () => {
    expect(subject.find('#dateInput').exists()).toBeTruthy();
    subject.find('#dateInput').simulate('change', { target : { value : '2018/05/12' }});
    expect(slidesActions.setAndUpdateDate).toHaveBeenCalledWith('12TTTTZMAY18');
  });

  it('should contain an operation input that updates the header string when changed', () => {
    expect(subject.find('#opInput').exists()).toBeTruthy();
    subject.find('#opInput').simulate('change', { target : { value : 'op superman'}});
    expect(slidesActions.setAndUpdateOpName).toHaveBeenCalledWith('op superman');
  });

  it('should contain an asset input that updates the header string when changed', () => {
    expect(subject.find('#assetInput').exists()).toBeTruthy();
    subject.find('#assetInput').simulate('change', { target : { value : 'flyguy'}});
    expect(slidesActions.setAndUpdateAsset).toHaveBeenCalledWith('flyguy');
  });

  it('should contain a classification input that updates the header string when changed', () => {
    expect(subject.find('#classificationInput').exists()).toBeTruthy();
    subject.find('#classificationInput').simulate('change', { target : { value : 'secret'}});
    expect(slidesActions.setAndUpdateClassification).toHaveBeenCalledWith('secret');
  });

  it('should contain an upload container', () => {
    expect(subject.find(InjectedUploadContainer).exists()).toBeTruthy();
  });

});