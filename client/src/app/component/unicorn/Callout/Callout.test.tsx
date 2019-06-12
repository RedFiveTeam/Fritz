import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Callout } from './Callout';
import { CalloutModel } from '../model/CalloutModel';
import { StyledStaticMessageDropdown } from '../../dropdown/StaticMessageDropdown';
import { SlideModel } from '../../slides/models/SlideModel';
import { StyledDropdown } from '../../dropdown/Dropdown';

describe('Callout', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;
  let slide: SlideModel;

  beforeEach(() => {
    unicornStore = {
      callouts: [new CalloutModel('', '', '', '', '', '')],
      offline: false
    };

    slide = new SlideModel();

    subject = shallow(
      <Callout
        unicornStore={unicornStore}
        slide={slide}
      />);
  });

  it('should contain a dropdown of callouts', () => {
    expect(subject.find(StyledDropdown).exists()).toBeTruthy();
  });

  it('should render different statuses as the uploading boolean changes', () => {
    expect(subject.find(StyledDropdown).exists()).toBeTruthy();
    slide.setUploading(true);
    expect(subject.find('.uploading').exists()).toBeTruthy();
    slide.setUploading(false);
    expect(subject.find('.finishedUpload').exists()).toBeTruthy();
  });

  it('should load a pseudo dropdown if there are no callouts', () => {
    unicornStore.callouts = [];
    subject.instance().forceUpdate();
    expect(subject.find(StyledStaticMessageDropdown).exists()).toBeTruthy();
  });

  it('should load a false offline dropdown if UNICORN is offline', () => {
    expect(subject.find(StyledStaticMessageDropdown).exists()).toBeFalsy();
    unicornStore.offline = true;
    subject.instance().forceUpdate();
    expect(subject.find(StyledStaticMessageDropdown).exists()).toBeTruthy();
  });
});