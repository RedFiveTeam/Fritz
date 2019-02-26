import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledDownloadButton } from '../buttons/DownloadButton';

interface Props {
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
          <div
            className="container-fluid"
          >
            <StyledDownloadButton/>
          </div>
        </nav>
      </div>
    );
  }
}

export const StyledFooter = styled(Footer)`
background: #1E232B;
position: absolute;
bottom: 0;
right: 0;
box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.5);
width: 100%;

  .container-fluid {
    justify-content: flex-end;
  }
`;