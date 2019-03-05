import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlidesActions } from '../slides/SlidesActions';
import { UploadStore } from '../form/UploadStore';
import { Toast } from '../../../utils/Toast';

interface Props {
  className?: string;
  slidesActions?: SlidesActions;
  uploadStore?: UploadStore;
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
              if (this.props.uploadStore!.uploaded) {
                await this.props.slidesActions!.renameAndDownload();
              } else {
                Toast.showDownloadError();
              }
            }}
          >
            Download JPEGs
          </button>
      </div>
    );
  }
}

export const StyledDownloadButton = inject('slidesActions', 'uploadStore')(styled(DownloadButton)`

  #downloadbutton {
    color: #fff;
    margin: 5px;
  }
`);