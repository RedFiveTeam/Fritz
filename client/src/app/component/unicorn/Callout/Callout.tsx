import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UnicornStore } from '../store/UnicornStore';
import { SlideModel } from '../../slides/SlideModel';
import { StyledDropdown } from '../../dropdown/Dropdown';
import { SlidesStore } from '../../slides/SlidesStore';
import { CalloutModel } from '../model/CalloutModel';

const Unicorn = require('../../../../icon/Unicorn.svg');
const Chain = require('../../../../icon/Chain.svg');

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
          <img src={Chain}/>
          <StyledDropdown
            options={
              this.props.unicornStore!.callouts
                .filter((c: any) => {
                  return c.time !== null;
                })
                .map((c: any) => {
                  if (c.time && c.time.toString().length > 0) {
                    return c.time;
                }
              })
            }
            defaultValue={this.props.slide.targetEventId ?
              this.props.unicornStore!.callouts.filter((c) => {
                return c.eventId === this.props.slide.targetEventId;
              })[0].time : 'Select'}
            callback={(s: string) => {
              this.props.slidesStore!.slides.filter((f: SlideModel) => {
                return f.id === this.props.slide.id;
              })[0].setTargetEventId(
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
            }}
          />
        </div>
      </div>
    );
  }
}

export const StyledCallout = inject('unicornStore', 'slidesStore')(styled(Callout)`

  display: inline-block;
  position: relative;
  top: -25px;
  width: 158px;
  height: 168px;
  background-color: #191e2a;
  border-radius: 2px;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.5);
  
  .title {
    color: #6c7f9c;
    font-size: 14px;
    line-height: 19px;
    height: 19px;
    padding-top: 12px;
  }
  
  .title > img {
    margin-left: 9px;
    margin-right: 8px;
    vertical-align: middle;
    margin-bottom: 6px;
  }
  
  .dropdown {
    top: 49px;
    left: 20px;
    
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
`);