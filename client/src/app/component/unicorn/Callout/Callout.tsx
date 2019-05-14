import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UnicornStore } from '../store/UnicornStore';
import { SlideModel } from '../../slides/SlideModel';
import { StyledDropdown } from '../../dropdown/Dropdown';
import { SlidesStore } from '../../slides/SlidesStore';
import { CalloutModel } from '../model/CalloutModel';

const Unicorn = require('../../../../icon/Unicorn.svg');
const GreenCheckmark = require('../../../../icon/GreenCheckmark.svg');

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
  slide: SlideModel;
  slidesStore?: SlidesStore;
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
          {this.props.slide.uploading === null &&
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
              defaultValue={this.props.slide.calloutTime ? this.props.slide.calloutTime
                : 'Select'}
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
          />
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
        </div>
      </div>
    );
  }
}

export const StyledCallout = inject('unicornStore', 'slidesStore')(styled(Callout)`

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