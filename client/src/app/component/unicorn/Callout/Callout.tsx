import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UnicornStore } from '../store/UnicornStore';
import { SlideModel } from '../../slides/SlideModel';
import { StyledDropdown } from '../../dropdown/Dropdown';
import { SlidesStore } from '../../slides/SlidesStore';
import { CalloutModel } from '../model/CalloutModel';

const Unicorn = require('../../../../icon/Unicorn.svg');

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
    left: 18px;
    top: 66px;
    border: solid 2px #ae4754;
    border-radius: 4px;
    position: absolute;
  }
`);