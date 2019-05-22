import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledDownloadButton } from '../buttons/DownloadButton';
import { StyledUnicornUploadButton } from '../buttons/UnicornUploadButton';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { StyledUnicornUploadProgress } from '../unicorn/components/UnicornUploadProgress';

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
}

@observer
export class Footer extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <nav className="navbar navbar-default">
          <div
            className="container-fluid"
          >
            {
              !this.props.unicornStore!.uploadsInProgress &&
              <StyledDownloadButton/>
            }
            {
              !this.props.unicornStore!.uploadsInProgress &&
              <StyledUnicornUploadButton/>
            }
            {
              this.props.unicornStore!.uploadsInProgress &&
              <StyledUnicornUploadProgress/>
            }
          </div>
        </nav>
      </div>
    );
  }
}

export const StyledFooter = inject('unicornStore')(styled(Footer)`
position: fixed;
background: #1E232B;
bottom: 0;
right: 0;
box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.5);
width: 100%;
z-index: 3;

  .container-fluid {
    justify-content: flex-end;
  }
`);