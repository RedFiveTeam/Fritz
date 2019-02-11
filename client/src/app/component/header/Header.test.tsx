import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Header } from './Header';

describe('Header', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <Header/>
    );
  });

  it('should display the naming convention', () => {
    expect(subject.find('.namingConvention').find('span').text()).toBe('DDTTTTZMONYY_TGT_NAME_ACTIVITY_ASSET_CLASSIFICATION');
  });

  it('should contain a fritz header', () => {
    expect(subject.find('.title').exists()).toBeTruthy();
  });
});