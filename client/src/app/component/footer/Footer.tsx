import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledActionButton } from '../button/ActionButton';
import { StyledUnicornUploadProgress } from '../unicorn/components/UnicornUploadProgress';

interface Props {
  downloader: () => {};
  uploader: () => {};
  hideButtons: boolean;
  className?: string;
}

@observer
export class Footer extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <nav className="navbar navbar-default">
          {
            !this.props.hideButtons
              ?
              <div
                className="container-fluid"
              >

                <StyledActionButton
                  clickAction={this.props.downloader}
                  text={'Download JPEGS'}
                  id={'downloadButton'}
                  disabled={false}
                />
                < StyledActionButton
                  clickAction={this.props.uploader}
                  text={'Upload to UNICORN'}
                  id={'uploadButton'}
                  disabled={false}
                />
              </div>
              :
              <StyledUnicornUploadProgress/>
          }
        </nav>
      </div>
    );
  }
}

export const StyledFooter = styled(Footer)`
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
  
  #downloadButton {
    color: #fff;
    margin: 5px;
  }
  
  #uploadButton {
    background-color: #00818C;
    
    :hover {
      background-color: #3BB7C1;
    }
  }  
`;