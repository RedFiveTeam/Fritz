import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledFormContainer } from '../form/FormContainer';
import { StyledProgressBar } from '../progressBar/ProgressBar';
import { StyledSlidesContainer } from '../slides/container/SlidesContainer';
import { UploadStore } from '../form/upload/UploadStore';
import { StyledSlidesContainerPlaceholder } from '../slides/container/SlidesContainerPlaceholder';

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
            this.props.uploadStore!.processing &&
            <StyledProgressBar/>
          }
          {
            this.props.uploadStore!.placeholder &&
            <StyledSlidesContainerPlaceholder/>
          }
        </div>
      </div>
    );
  }
}

export const StyledAppBody = inject('uploadStore')(styled(AppBody)`
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
    width: 51%;
    max-height: 750px;
    min-height: 500px;
    display: inline-block;
    position: absolute;
    padding-top: 16px;
    overflow-y: auto;
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
