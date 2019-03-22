import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlideModel } from '../slides/SlideModel';
import { SlidesStore } from '../slides/SlidesStore';
import { SlidesActions } from '../slides/actions/SlidesActions';

interface Props {
  className?: string;
  slideModel: SlideModel;
  slideNumber: number;
  slidesStore?: SlidesStore;
  slidesActions?: SlidesActions;
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
          s.time === 'TTTT' ? <span className="text-info font-italic">TTTTZ</span> : <span>
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
          (this.props.slidesStore!.classification || 'CLASSIFICATION'))
          .split(' ').join('_').toUpperCase()
        }
      </div>
    );
  };

  render() {
    return (
      <div className={this.props.className + ' carousel-item'}>
        <img
          src={'/api/image/' + this.props.slideModel.oldName}
          className="d-block"
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
                    (nextCarousel.querySelector('#timeInput') as HTMLElement).focus();
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

export const StyledCarousel = inject('slidesStore', 'slidesActions')(styled(Carousel)`

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

   .activityInputField {
      position: relative;
      display: block;
   }

   img {
      left: 25%;
      width: 860px;
      height: auto;
      position: relative;
   }

   .carousel-item {
      transition: transform 500ms ease, opacity 100ms ease-out
   }

   .numberAndTitle {
      text-align: center;
      top: 15px;
      position: relative;
   }
`);