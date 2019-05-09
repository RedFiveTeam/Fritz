import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlidesActions } from '../slides/actions/SlidesActions';
import { UploadStore } from '../form/upload/UploadStore';
import { Toast } from '../../../utils/Toast';
import { SlidesStore } from '../slides/SlidesStore';

interface Props {
  className?: string;
  slidesActions?: SlidesActions;
  uploadStore?: UploadStore;
  slidesStore?: SlidesStore;
}

@observer
export class DownloadButton extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <button
          id="downloadbutton"
          type="button"
          onClick={async () => {
            if (!this.props.uploadStore!.uploaded) {
              this.props.slidesStore!.setValidate(true);
              Toast.create(
                5000,
                'errorToast',
                '<b>Error:</b> You must upload a PDF file before you can download JPEGS'
              );
            } else if (!this.props.slidesStore!.isValidName()) {
              this.props.slidesStore!.setValidate(true);
              return Promise.resolve();
            } else if (!this.props.slidesStore!.isValidDate()) {
              this.props.slidesStore!.setValidate(true);
              return Promise.resolve();
            } else if (!this.props.slidesStore!.isValidReleasability()) {
              this.props.slidesStore!.setValidate(true);
              return Promise.resolve();
            } else if (this.props.uploadStore!.uploading) {
              Toast.create(
                5000,
                'errorToast',
                '<b>Error:</b> Please wait. Your file is being converted'
              );
            } else {
              this.props.slidesStore!.setValidate(false);
              await this.props.slidesActions!.trackRenameAndDownload();
            }
          }}
        >
          Download JPEGs
        </button>
      </div>
    );
  }
}

export const StyledDownloadButton = inject('slidesActions', 'uploadStore', 'slidesStore')(styled(DownloadButton)`

  #downloadbutton {
    color: #fff;
    margin: 5px;
  }
  
  button {
    float: right;
     width: 157px;
    height: 38px;
    border-radius: 4px;
    border: solid 1px #00818C;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 250ms;
    cursor: pointer;
    
    :hover {
      background-color: #00818C;
    }
  }
`);