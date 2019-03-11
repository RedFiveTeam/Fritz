import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledFormContainer } from '../form/FormContainer';
import { StyledProgressBar } from '../progressBar/ProgressBar';
import { StyledSlidesContainer } from '../slides/container/SlidesContainer';
import { UploadStore } from '../form/upload/UploadStore';

interface Props {
  className?: string;
  uploadStore?: UploadStore;
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
          {
            this.props.uploadStore!.processing &&
            <StyledProgressBar/>
          }
        </div>
      </div>
    );
  }
}

export const StyledAppBody = inject('uploadStore')(styled(AppBody)`
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
