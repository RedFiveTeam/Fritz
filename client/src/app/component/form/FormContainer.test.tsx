import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FormContainer } from './FormContainer';
import { InjectedUploadContainer } from './UploadContainer';

describe('FormContainer', () => {
  let subject: ShallowWrapper;
  let slidesStore: any;

  slidesStore = {
    setDate: jest.fn(),
    setOpName: jest.fn(),
    setAsset: jest.fn(),
    setClassification: jest.fn()
  };

  beforeEach(() => {
    subject = shallow(
      <FormContainer
        slidesStore={slidesStore}
      />);
  });

  it('should contain a date input that updates the header string when changed', () => {
    expect(subject.find('#dateInput').exists()).toBeTruthy();
    subject.find('#dateInput').simulate('change', { target : { value : '2018/05/12' }});
    expect(slidesStore.setDate).toHaveBeenCalledWith('12TTTTZMAY18');
  });

  it('should contain an operation input that updates the header string when changed', () => {
    expect(subject.find('#opInput').exists()).toBeTruthy();
    subject.find('#opInput').simulate('change', { target : { value : 'op superman'}});
    expect(slidesStore.setOpName).toHaveBeenCalledWith('op superman');
  });

  it('should contain an asset input that updates the header string when changed', () => {
    expect(subject.find('#assetInput').exists()).toBeTruthy();
    subject.find('#assetInput').simulate('change', { target : { value : 'flyguy'}});
    expect(slidesStore.setAsset).toHaveBeenCalledWith('flyguy');
  });

  it('should contain a classification input that updates the header string when changed', () => {
    expect(subject.find('#classificationInput').exists()).toBeTruthy();
    subject.find('#classificationInput').simulate('change', { target : { value : 'secret'}});
    expect(slidesStore.setClassification).toHaveBeenCalledWith('secret');
  });

  it('should contain an upload container', () => {
    expect(subject.find(InjectedUploadContainer).exists()).toBeTruthy();
  });

});