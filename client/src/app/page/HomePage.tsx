import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledAppBody } from '../component/body/AppBody';
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

export const StyledHomePage = styled(HomePage)`
`;