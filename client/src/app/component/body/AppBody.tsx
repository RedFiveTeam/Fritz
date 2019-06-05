import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledFormContainer } from '../form/FormContainer';
import { StyledSlidesContainer } from '../slides/container/SlidesContainer';
import { UploadStore } from '../form/upload/UploadStore';
import { StyledSlidesContainerPlaceholder } from '../slides/container/SlidesContainerPlaceholder';
import { StyledUploadProgressContainer } from '../slides/container/UploadProgressContainer';
import { StyledProgressBar } from '../progressBar/ProgressBar';
import { StyledUploadContainer } from '../form/upload/container/UploadContainer';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { StyledUnicornUploadModal } from '../modals/UnicornUploadModal';

interface Props {
  className?: string;
  uploadStore?: UploadStore;
  unicornStore?: UnicornStore;
}

@observer
export class AppBody extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.props.uploadStore!.uploaded ?
            <div>
              <div className="left">
                {
                  this.props.uploadStore!.uploaded &&
                  <StyledFormContainer/>
                }
                <StyledUploadContainer/>
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
                {
                  this.props.unicornStore!.isModalDisplayed &&
                  <StyledUnicornUploadModal/>
                }
              </div>
            </div>
            :
            <StyledUploadContainer/>
        }
      </div>
    );
  }
}

export const StyledAppBody = inject('uploadStore', 'unicornStore')(styled(AppBody)`
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
    height: calc(100vh - 140px);
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
  
    .uploadButton {
    width: .1px;
    height: .1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }  
  
  .browse {
    color: #15deec;
  }
  
  #pdfName {
    margin-top: 15px;
  }
  
   #uploadCompleteContainer {
    top: 485px;
    position: absolute;
  }
  
  #deletePP {
    cursor: pointer;
  }
  
  .converterTitle {
    position: absolute;
    top: 29px;
    left: 40px;
    
       h2 {
        font-size: 24px;
      }
      
       span {
        font-size: 16px;
        color: #d8e5ff;
      }
  }
  
  .step1 {
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    top: 118px;
    left: 40px;
    pointer-events: none;
  }
  
  #adobe {
    position: relative;
    left: 159px;
    top: 68px;
  }
  
  #dragMessage {
    font-size: 24px;
    width: 580px;
    position: relative;
    top: 126px;
    padding-bottom: 6rem;
    color: #d4d6db;
    cursor: pointer;
  }
  
  .dragMessage2 {
    font-size: 20px;
    color: #d4d6db;
  }
  
  #clickable {
    cursor: pointer;
  }
`);
