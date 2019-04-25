import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledFormContainer } from '../form/FormContainer';
import { StyledSlidesContainer } from '../slides/container/SlidesContainer';
import { UploadStore } from '../form/upload/UploadStore';
import { StyledSlidesContainerPlaceholder } from '../slides/container/SlidesContainerPlaceholder';
import { StyledUploadProgressContainer } from '../slides/container/UploadProgressContainer';
import { StyledProgressBar } from '../progressBar/ProgressBar';

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
        <div className="spacer"/>
        <div className="right">
          <StyledSlidesContainer/>
          {
            this.props.uploadStore!.uploading &&
            <StyledUploadProgressContainer/>
          }
          {
            this.props.uploadStore!.processing &&
            <StyledProgressBar/>
          }
          {
            this.props.uploadStore!.placeholder && !this.props.uploadStore!.uploading &&
            <StyledSlidesContainerPlaceholder/>
          }
        </div>
      </div>
    );
  }
}

export const StyledAppBody = inject('uploadStore')(styled(AppBody)`
  .spacer {
    width: 5px;
    overflow: hidden;
    position: absolute;
    top: 72px;
    display: inline-block;
    height: 625px;
    border-left: 1px solid #6C7F9C;
  }
  
  .left {
    width: 44vw;
    min-width: 700px;
    display: inline-block;
  }
  
  .right {
    scroll-behavior: smooth;
    width: 57vw;
    height: calc(100vh - 160px);
    min-height: 500px;
    display: inline-block;
    position: absolute;
    padding-top: 16px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 3px;
    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
      display: none; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #5C667D; 
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #5C667D; 
    }
  }
`);
