import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlidesActions } from '../slides/SlidesActions';

interface Props {
  className?: string;
  slidesActions?: SlidesActions;
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
              await this.props.slidesActions!.renameAndDownload();
            }}
          >
            Download JPEGs
          </button>
      </div>
    );
  }
}

export const StyledDownloadButton = inject('slidesActions')(styled(DownloadButton)`

  #downloadbutton {
    color: #fff;
    margin: 5px;
  }
`);