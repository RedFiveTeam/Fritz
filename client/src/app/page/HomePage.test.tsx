import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomePage } from './HomePage';
import { StyledFooter } from '../component/footer/Footer';
import { StyledAppBody } from '../component/body/AppBody';
import { StyledSelectMissionModal } from '../component/modals/SelectMissionModal';
import { StyledHelpMenu } from '../component/modals/HelpMenu';
import { SlidesStore } from '../component/slides/store/SlidesStore';
import { StyledLoadingScreen } from '../component/slides/container/LoadingScreen';

describe('HomePage', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;
  let slidesStore: SlidesStore;
  let slideActions: any;
  let unicornActions: any;
  let uploadStore: any;

  beforeEach(() => {
    unicornStore = {
      activeMission: null,
      isUploading: jest.fn()
    };

    unicornActions = {
      uploadToUnicorn: jest.fn()
    };

    slidesStore = new SlidesStore();

    slideActions = {
      trackRenameAndDownload: jest.fn(),
    };

    uploadStore = {
      uploading: false,
      processing: false
    };

    subject = shallow(
      <HomePage
        unicornStore={unicornStore}
        slidesStore={slidesStore}
        slidesActions={slideActions}
        unicornActions={unicornActions}
        uploadStore={uploadStore}
      />
    );
  });

  it('should have a body without loading screen', () => {
    expect(subject.find(StyledAppBody).exists()).toBeTruthy();
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
  });

  it('should have send appropriate actions to its footer', () => {
    expect(subject.find(StyledFooter).exists()).toBeTruthy();
    expect(subject.find(StyledFooter).prop('downloader')).toBe(slideActions.trackRenameAndDownload);
  });

  it('should show a modal to select the mission', () => {
    expect(subject.find(StyledSelectMissionModal).exists()).toBeTruthy();
  });

  it('should show a help menu modal when help is true', () => {
    expect(subject.find(StyledHelpMenu).exists()).toBeFalsy();
    slidesStore.setHelp(true);
    expect(subject.find(StyledHelpMenu).exists()).toBeTruthy();
  });

  it('should pass a hide button status to footer', () => {
    expect(subject.find(StyledFooter).prop('hideButtons')).toBe(unicornStore.isUploading);
  });

  it('should show a loading screen uploading from user or converting', () => {
    uploadStore.uploading = true;
    subject.instance().forceUpdate();
    expect(subject.find(StyledAppBody).exists()).toBeFalsy();
    expect(subject.find(StyledFooter).exists()).toBeFalsy();
    expect(subject.find(StyledLoadingScreen).exists()).toBeTruthy();

    uploadStore.uploading = false;
    uploadStore.processing = true;
    subject.instance().forceUpdate();
    expect(subject.find(StyledAppBody).exists()).toBeFalsy();
    expect(subject.find(StyledFooter).exists()).toBeFalsy();
    expect(subject.find(StyledLoadingScreen).exists()).toBeTruthy();
  });
});