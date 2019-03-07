import * as React from 'react';
import { observer } from 'mobx-react';
import { StyledSlidesContainer } from '../slides/container/SlidesContainer';
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
height: auto;
min-height: 1000px;
  .spacer {
    overflow: hidden;
    position: absolute;
    top: 17%;
    display: inline-block;
    height: 625px;
    border-left: 1px solid #6C7F9C;
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
    top: 20%;
  }

`);
