import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UnicornStore } from '../store/UnicornStore';
import { SlideModel } from '../../slides/models/SlideModel';
import { StyledDropdown } from '../../dropdown/Dropdown';
import { SlidesStore } from '../../slides/store/SlidesStore';
import { CalloutModel } from '../model/CalloutModel';
import { StyledPseudoDropdown } from '../../dropdown/PseudoDropdown';
import { UnicornActions } from '../actions/UnicornActions';

const Unicorn = require('../../../../icon/Unicorn.svg');
const GreenCheckmark = require('../../../../icon/GreenCheckmark.svg');
const FailedIcon = require('../../../../icon/UploadFailedIcon.svg');
const WaitingIcon = require('../../../../icon/WaitingIcon.svg');

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
  slide: SlideModel;
  slidesStore?: SlidesStore;
  unicornActions?: UnicornActions;
}

@observer
export class Callout extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="title">
          <img src={Unicorn}/>
          <span>UNICORN Callout</span>
        </div>
        <div className="content">
          {
            this.props.unicornStore!.unassignedCallouts &&
            this.props.slide!.targetEventId === '' &&
            <div className="redBox"/>
          }
          {
            !this.props.unicornStore!.pendingCallouts && this.props.unicornStore!.callouts.length > 0 ?
              (this.props.slide.uploading === null &&
                  <StyledDropdown
                      options={
                        this.props.unicornStore!.callouts ?
                          this.props.unicornStore!.callouts
                            .filter((c: any) => {
                              return c.time !== null;
                            })
                            .map((c: any) => {
                              if (c.time && c.time.toString().length > 0) {
                                return c.time;
                              }
                            }) : []
                      }
                      defaultValue={'Select'}
                      value={this.props.slide.calloutTime}
                      callback={(s: string) => {
                        let slide = this.props.slidesStore!.slides.filter((f: SlideModel) => {
                          return f.id === this.props.slide.id;
                        })[0];
                        slide.setTargetEventId(
                          this.props.unicornStore!.callouts
                            .filter((c: CalloutModel) => {
                              return c.time !== null;
                            })
                            .filter((c: CalloutModel) => {
                              if (c.time && c.time.toString().length > 0) {
                                return c.time.toString() === s;
                              }
                              return false;
                            })[0].eventId
                        );
                        slide.setCalloutTime(s);
                      }}
                  />)
              :
              (this.props.unicornStore!.callouts.length === 0 &&
                  <StyledPseudoDropdown/>
              )
          }
          {
            this.props.slide.uploading === null &&
            this.props.slide.failed !== true &&
            this.props.unicornStore!.uploadsInProgress &&
            this.props.slide.targetEventId !== '' &&
            <div
                className="waitingUpload"
            >
                <img className="waitingIcon" src={WaitingIcon}/>
                <span className="uploadWaiting">Waiting to Upload</span>
            </div>
          }
          {
            this.props.slide.uploading === false &&
            <div
                className="finishedUpload"
            >
                <img className="uploadCompleteIcon" src={GreenCheckmark}/>
                <span className="uploadComplete">Uploaded to {this.props.slide.calloutTime}</span>
            </div>
          }
          {
            (this.props.slide.uploading) &&
            <div
                className="uploading"
            >
                <div
                    className="loadingCallout"
                />
                <span className="uploadPending">Uploading</span>
            </div>
          }
          {
            (this.props.slide.failed) &&
            <div
                className="failedUpload"
            >
                <img className="failedIcon" src={FailedIcon}/>
                <span className="uploadFailed">Upload Failed
                    <span
                        onClick={async () => {
                          this.props.slide.setFailed(false);
                          this.props.unicornStore!.addToUploadQueue(this.props.slide);
                          await this.props.unicornActions!.startUploading();
                        }}
                    > Retry
                    </span>
                </span>
            </div>
          }
        </div>
      </div>
    );
  }
}

export const StyledCallout = inject('unicornStore', 'slidesStore', 'unicornActions')(styled(Callout)`

  display: inline-block;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 188px;
  height: 168px;
  background-image: linear-gradient(to right, #191e2a, #364054);
  
  .title {
    color: #6c7f9c;
    font-size: 14px;
    top: 11px;
    position: relative;
    width: 160px;
    margin: auto;
  }
  
  .title > img {
    margin-left: 9px;
    margin-right: 8px;
    vertical-align: middle;
    margin-bottom: 6px;
  }
  
  .dropdown {
    top: 44px;
    left: 34px;
    
    button {
      color: #15deec;
      font-size: 20px;
      font-weight: bold;
    }
    
    .dd {
      left: 0;
      width: 118px;
      overflow-y: auto;
      max-height: 185px;
      
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
    
    .ddd {
      :hover {
        font-weight: bold;
    }
    }
  }
  
  .content > img {
    top: 84px;
    z-index: 2;
    left: -20px;
    position: absolute;
  }
  
  .redBox {
    width: 121px;
    height: 48px;
    left: 32px;
    top: 68px;
    border: solid 2px #ae4754;
    border-radius: 4px;
    position: absolute;
  }
  
  .uploadPending {
    font-weight: 700;
    position: absolute;
    display: inline-block;
    bottom: 15px;
    left: 54px;
  }
  
  .uploadFailed {
    font-weight: 700;
    position: absolute;
    display: inline-block;
    bottom: 15px;
    left: 23px;
    
    span {
      color: #15deec;
      font-weight: 300;
      cursor: pointer;
    }
  }
  
  .failedIcon, .waitingIcon {
    position: absolute;
    left: 123px;
    top: 82px;
    pointer-events: none;
  }
  
  .waitingIcon {
    width: 16px;
    left: 127px;
  }
  
  .uploadWaiting {
    position: absolute;
    display: inline-block;
    bottom: 15px;
    left: 23px;
    font-style: italic;
    font-weight: 500;
    letter-spacing: 0.4px;
  }
  
  .uploadComplete {
    font-weight: 700;
    position: absolute;
    display: inline-block;
    bottom: 15px;
    left: 21px;
  }
  
  .uploadCompleteIcon {
    position: absolute;
    left: 63px;
    top: 52px;
  }
  
  .loadingCallout {
    color: #fff;
    border-radius: 50%;
    display: block;
    height: .5em;
    margin: auto;
    position: absolute;
    top: 47%;
    width: .5em;
    right: 0px;
    left: 0px;
  }
  .loadingCallout {
    animation: loadingCallout 700ms infinite;
  }
  
  @keyframes loadingCallout {
    0% {
      box-shadow: 1.2em 0 0 .2em #15DEEC, 
                  .5em 1em #EFF6F7,
                  -0.5em 1em #EFF6F7,
                  -1.2em 0 #EFF6F7,
                  -0.5em -1em #DAF6F8,
                  .5em -1em #8EE4EA;
    }
    16.666% {
      box-shadow: 1.2em 0 #8EE4EA, 
                  .5em 1em 0 .2em #15DEEC,
                  -0.5em 1em #EFF6F7,
                  -1.2em 0 #EFF6F7,
                  -0.5em -1em #EFF6F7,
                  .5em -1em #DAF6F8;
    }
    33.332% {
      box-shadow: 1.2em 0 #DAF6F8, 
                  .5em 1em #8EE4EA,
                  -0.5em 1em 0 .2em #15DEEC,
                  -1.2em 0 #EFF6F7,
                  -0.5em -1em #EFF6F7,
                  .5em -1em #EFF6F7;
    }
    50% {
      box-shadow: 1.2em 0 #EFF6F7, 
                  .5em 1em #DAF6F8,
                  -0.5em 1em #8EE4EA,
                  -1.2em 0 0 .2em #15DEEC,
                  -0.5em -1em #EFF6F7,
                  .5em -1em #EFF6F7;
    }
    66.666% {
      box-shadow: 1.2em 0 #EFF6F7, 
                  .5em 1em #EFF6F7,
                  -0.5em 1em #DAF6F8,
                  -1.2em 0 #8EE4EA,
                  -0.5em -1em 0 .2em #15DEEC,
                  .5em -1em #EFF6F7;
    }
    83.333% {
      box-shadow: 1.2em 0 #EFF6F7, 
                  .5em 1em #EFF6F7,
                  -0.5em 1em #EFF6F7,
                  -1.2em 0 #DAF6F8,
                  -0.5em -1em #8EE4EA,
                  .5em -1em 0 .2em #15DEEC;
    }
    100% {
      box-shadow: 1.2em 0 0 .2em #15DEEC, 
                  .5em 1em #EFF6F7,
                  -0.5em 1em #EFF6F7,
                  -1.2em 0 #EFF6F7,
                  -0.5em -1em #DAF6F8,
                  .5em -1em #8EE4EA;
    }
  }
`);