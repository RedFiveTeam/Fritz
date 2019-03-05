import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlidesActions } from '../slides/SlidesActions';
import { UploadStore } from '../form/UploadStore';
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
            className="btn rounded bg-info float-right"
            onClick={async () => {
              if (!this.props.uploadStore!.uploaded) {
                this.props.slidesStore!.setValidate(true);
                Toast.showDownloadError();
              } else if (!this.props.slidesStore!.isValidName()) {
                this.props.slidesStore!.setValidate(true);
                return Promise.resolve();
              } else {
                this.props.slidesStore!.setValidate(false);
                await this.props.slidesActions!.renameAndDownload();
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
`);