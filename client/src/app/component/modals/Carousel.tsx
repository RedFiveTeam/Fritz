import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlideModel } from '../slides/SlideModel';
import { SlidesStore } from '../slides/SlidesStore';
import { SlidesActions } from '../slides/actions/SlidesActions';
import { UploadStore } from '../form/upload/UploadStore';
import { StyledDropdown } from '../dropdown/Dropdown';
import { CalloutModel } from '../unicorn/model/CalloutModel';
import { UnicornStore } from '../unicorn/store/UnicornStore';

interface Props {
  className?: string;
  slideModel: SlideModel;
  slideNumber: number;
  slidesStore?: SlidesStore;
  slidesActions?: SlidesActions;
  uploadStore?: UploadStore;
  unicornStore?: UnicornStore;
}

@observer
export class Carousel extends React.Component<Props> {
  getSlideName = (s: SlideModel, idx: number) => {
    return (
      <div key={idx} className="slide">
        {
          this.props.slidesStore!.day
        }
        {
          s.time === 'TTTT' ? <span><span className="text-info font-italic">TTTT</span>Z</span> : <span>
            {s.time}Z
          </span>}
        {
          this.props.slidesStore!.month
        }
        {
          this.props.slidesStore!.year
        }
        {
          ('_' + (this.props.slidesStore!.opName || 'TGT_NAME') + '_').toUpperCase().split(' ').join('_')
        }
        {
          s.activity === 'ACTY' ? <span className="text-info font-italic">ACTY</span> : <span>
            {s.activity.split(' ').join('_')}
          </span>}
        {('_' + (this.props.slidesStore!.asset || 'ASSET') + '_' +
          (this.props.slidesStore!.releasability || 'RELEASABILITY'))
          .split(' ').join('_').toUpperCase()
        }
      </div>
    );
  };

  render() {
    return (
      <div className={this.props.className + ' carousel-item'}>
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
          defaultValue={this.props.slideModel.calloutTime ? this.props.slideModel.calloutTime
            : 'Select'}
          callback={(s: string) => {
            let slide = this.props.slidesStore!.slides.filter((f: SlideModel) => {
              return f.id === this.props.slideModel.id;
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
        <img
          src={'/api/image/' + this.props.uploadStore!.hash + '/' + this.props.slideModel.oldName}
          className="d-block bigImg"
          alt="..."
        />
        <div
          className="numberAndTitle"
        >
          <div
            className="slideNumber"
          >
            {
              this.props.slideNumber + 1} of {this.props.slidesStore!.slides.length
          }
          </div>
          <div>{this.getSlideName(this.props.slideModel, this.props.slideNumber)}</div>
        </div>
        <div className="slidesInputs">
          <div className="timeInputField">
            <label>
              Time
            </label>
            <input
              maxLength={4}
              onChange={(e: any) => {
                  let ele = document.querySelector(
                    '.slideCardContainer:nth-of-type(' + (this.props.slideNumber + 1) + ')')!
                    .querySelector('#timeInput') as HTMLInputElement;
                  ele.value = e.target.value;
                  this.props.slidesActions!.setAndUpdateTime(
                    this.props.slideModel,
                    e.target.value.toUpperCase()
                  );
              }}
              type="text"
              className="form-control"
              id="timeInput"
              placeholder="e.g. 0830"
            />
          </div>
          <div className="activityInputField">
            <label>
              Activity
            </label>
            <input
              maxLength={64}
              onKeyDown={(e: any) => {
                if (e.keyCode === 9) {
                  e.preventDefault();
                  (document.querySelector('.carousel-control-next') as HTMLElement).click();
                  let nextCarousel = document.querySelector('.active')!.nextSibling as HTMLElement;
                  if (nextCarousel && nextCarousel.classList.contains('carousel-item')) {
                    let timeInput = nextCarousel.querySelector('#timeInput') as HTMLInputElement;
                    if (timeInput.value.length === 4) {
                      (nextCarousel.querySelector('#activityInput') as HTMLElement).focus();
                    } else {
                      timeInput.focus();
                    }
                  } else {
                    nextCarousel = document.querySelector('.carousel-item:first-of-type') as HTMLElement;
                    (nextCarousel.querySelector('#timeInput') as HTMLElement).focus();
                  }
                }
              }}
              onChange={(e: any) => {
                let ele = document.querySelector(
                  '.slideCardContainer:nth-of-type(' + (this.props.slideNumber + 1) + ')')!
                  .querySelector('#activityInput') as HTMLInputElement;
                ele.value = e.target.value;
                this.props.slidesActions!.setAndUpdateActivity(
                  this.props.slideModel,
                  e.target.value.toUpperCase()
                );
              }}
              type="text"
              className="form-control"
              id="activityInput"
              placeholder="e.g. OV"
            />
          </div>
        </div>
      </div>
    );
  }
}

export const StyledCarousel = inject('slidesStore', 'slidesActions', 'uploadStore', 'unicornStore')(styled(Carousel)`

  input {
    width: 166px;
    color: #fff;
    background-color:rgba(0, 0, 0, 0);
    text-transform: uppercase;
  }
  
   input:focus {
    background-color:rgba(0, 0, 0, 0);
    color: #fff;
    border: #15deec solid 1px;
  }
   
   .slidesInputs {
      position: relative;
      display: block;
      width: 360px;
      margin: auto;
      top: 16px;
  }

   .timeInputField {
      position: relative;
      display: block;
      float: left;
      margin-right: 6%;
      z-index: 1;
   }
   
   .dropdown {
    position: absolute;
    right: 182px;
    z-index: 3;
    
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

   .activityInputField {
      position: relative;
      display: block;
   }

   .bigImg {
      left: 11.3%;
      width: 1280px;
      height: auto;
      position: relative;
   }

   .carousel-item {
      transition: transform 500ms ease, opacity 100ms ease-out;
   }

   .numberAndTitle {
      text-align: center;
      top: 15px;
      position: relative;
   }
   
   label {
    font-size: 16px;
   }
`);