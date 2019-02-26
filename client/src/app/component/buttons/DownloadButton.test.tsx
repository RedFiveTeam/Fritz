import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { DownloadButton } from './DownloadButton';

describe('DownloadButton', () => {
  let subject: ShallowWrapper;
  let slidesActions: any;

  slidesActions = {
    renameAndDownload: jest.fn()
  };

  beforeEach(() => {
    subject = shallow(
      <DownloadButton
        slidesActions={slidesActions}
      />
    );
  });

  it('should render a button that renames and downloads on click', () => {
    expect(subject.find('#downloadbutton').exists()).toBeTruthy();
    expect(subject.find('#downloadbutton').simulate('click'));
    expect(slidesActions.renameAndDownload).toHaveBeenCalled();
  });
});