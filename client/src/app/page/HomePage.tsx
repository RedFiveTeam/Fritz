import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledAppBody } from '../component/body/AppBody';
import { StyledToast } from '../../utils/Toast';
import { StyledFooter } from '../component/footer/Footer';

interface Props {
  className?: string;
}

@observer
export class HomePage extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledToast/>
        <div
          className="mainBody"
        >
          <StyledAppBody/>
          <StyledFooter/>
        </div>
      </div>
    );
  }
}

export const StyledHomePage = (styled(HomePage)`
height: auto;
min-height: 1060px;
overflow-y: hidden;
`);