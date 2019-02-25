import * as React from 'react';
import { observer } from 'mobx-react';
import { StyledSlidesContainer } from '../slides/SlidesContainer';
import styled from 'styled-components';
import { StyledFormContainer } from '../form/FormContainer';

interface Props {
  className?: string;
}

@observer
export class AppBody extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="left">
          <StyledFormContainer/>
        </div>
        <div className="spacer" />
        <div className="right">
          <StyledSlidesContainer/>
        </div>
      </div>
    );
  }
}

export const StyledAppBody = (styled(AppBody)`

  height: 80%;
  position: relative;
  
  .spacer {
    position: relative;
    top: 20%;
    display: inline-block;
  }
  
  .left {
    width: 49%;
    min-width: 800px;
    display: inline-block;
  }
  
  .right {
    width: 49%;
    display: inline-block;
    position: absolute;
    top: 25%;
  }

`);
