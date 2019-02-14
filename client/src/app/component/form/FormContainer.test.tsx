import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FormContainer } from './FormContainer';
import { InjectedUploadContainer } from './UploadContainer';

describe('FormContainer', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<FormContainer/>);
  });

  it('should contain a date input that updates the header string when changed', () => {
    expect(subject.find('#dateInput').exists()).toBeTruthy();
    subject.find('#dateInput').simulate('change', { target : { value : '2018/05/12' }});
    expect(subject.find('h4').text()).toContain('12TTTTZMAY18_');
  });

  it('should contain an operation input that updates the header string when changed', () => {
    expect(subject.find('#opInput').exists()).toBeTruthy();
    subject.find('#opInput').simulate('change', { target : { value : 'op superman'}});
    expect(subject.find('h4').text()).toContain('_OP_SUPERMAN_');
  });

  it('should contain an asset input that updates the header string when changed', () => {
    expect(subject.find('#assetInput').exists()).toBeTruthy();
    subject.find('#assetInput').simulate('change', { target : { value : 'flyguy'}});
    expect(subject.find('h4').text()).toContain('_FLYGUY_');
  });

  it('should contain a classification input that updates the header string when changed', () => {
    expect(subject.find('#classificationInput').exists()).toBeTruthy();
    subject.find('#classificationInput').simulate('change', { target : { value : 'secret'}});
    expect(subject.find('h4').text()).toContain('_SECRET');
  });

  it('should display the naming convention', () => {
    expect(subject.find('.namingConvention').find('span')
      .text()).toBe('DDTTTTZMONYY_TGT_NAME_ACTIVITY_ASSET_CLASSIFICATION');
  });

  it('should contain an upload container', () => {
    expect(subject.find(InjectedUploadContainer).exists()).toBeTruthy();
  });

});