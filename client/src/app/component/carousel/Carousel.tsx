import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { CarouselActions } from './CarouselActions';
import { StyledCarouselItem } from './CarouselItem';
import { SlideModel } from '../slides/models/SlideModel';
import { CarouselStore } from './CarouselStore';
import { SlidesActions } from '../slides/actions/SlidesActions';
import { StyledDropdown } from '../dropdown/Dropdown';
import { CalloutModel } from '../unicorn/model/CalloutModel';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { SlidesStore } from '../slides/store/SlidesStore';
import { CSSProperties } from 'react';

const exitIconPath = require('../../../icon/ExpandedCloseIcon.svg');
const arrowIcon = require('../../../icon/ArrowIcon.svg');

interface Props {
  slides: SlideModel[];
  carouselActions?: CarouselActions;
  carouselStore?: CarouselStore;
  slidesActions?: SlidesActions;
  slidesStore?: SlidesStore;
  className?: string;
  unicornStore?: UnicornStore;
}

@observer
export class Carousel extends React.Component<Props> {

  leftAnimation: CSSProperties = {
    left: '11.5vw',
    display: 'block',
    transition: 'left 0.7s'
  };

  componentDidMount(): void {
    document.addEventListener('keydown', (e: any) => {
      if (e.keyCode === 27) {
        this.props.carouselActions!.hide();
      }
    });
  }

  componentWillMount(): void {
    this.props.carouselActions!.initialize(this.props.slides.length);
  }

  buildDropdown(activeSlide: SlideModel) {
    return (
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
        value={activeSlide.calloutTime}
        callback={(s: string) => {
          let slide = this.props.slidesStore!.slides.filter((f: SlideModel) => {
            return f.id === activeSlide.id;
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
    );

  }

  render() {
    let {carouselActions} = this.props;
    let activeSlide = this.props.carouselStore!.activeItemIndex;
    let nextSlide = this.props.carouselStore!.nextActiveIndex;
    let prevSlide = this.props.carouselStore!.previousActiveIndex;

    return (
      <div className={this.props.className}>
        <div className="imgControls">
          <img
            src={arrowIcon}
            className={'previous'}
            onClick={carouselActions!.previous}
          />
          <img
            src={arrowIcon}
            className="next"
            onClick={carouselActions!.next}
          />
          <img
            className={'exitIcon'}
            src={exitIconPath}
            onClick={carouselActions!.hide}
          />
          <div
            className={'previousSlide'}
            onTransitionEnd={(e: any) => {
              if (e.propertyName === 'left') {
                this.props.carouselStore!.setAnimating('');
                e.target.style.transition = 'left 0.7s';
                this.props.carouselStore!.decreaseActiveIndex();
              }
            }}
            style={this.props.carouselStore!.animating === 'right' ?
              {left: '11.5vw'} : {transition: 'none', left: '-200%'}
            }
          >

            <StyledCarouselItem
              slide={this.props.slides[prevSlide]}
              changeTime={this.props.slidesActions!.setAndUpdateTime}
              changeActivity={this.props.slidesActions!.setAndUpdateActivity}
              callout={
                this.buildDropdown(this.props.slides[prevSlide])
              }
              count={(prevSlide + 1) + ' of ' + this.props.slidesStore!.undeletedSlides.length}
              tabIndex={6}
            />
          </div>
          <div
            className={'currentSlide'}
            onTransitionEnd={(e: any) => {
              if (e.propertyName === 'left') {
                e.target.style.transition = 'none';
                this.props.carouselStore!.setAnimating('');
              }
            }}
            style={this.props.carouselStore!.animating !== '' ?
              this.props.carouselStore!.animating === 'left' ? {left: '-170%', transition: 'left 0.7s'} :
                (this.props.carouselStore!.animating === 'right' ? {left: '170%', transition: 'left 0.7s'} :
                  {transition: 'none', left: '0%'}) : {transition: 'none', left: '0%'}
            }
          >
            <StyledCarouselItem
              active={true}
              slide={this.props.slides[activeSlide]}
              changeTime={this.props.slidesActions!.setAndUpdateTime}
              changeActivity={this.props.slidesActions!.setAndUpdateActivity}
              callout={
                this.buildDropdown(this.props.slides[activeSlide])
              }
              count={(activeSlide + 1) + ' of ' + this.props.slidesStore!.undeletedSlides.length}
              tabIndex={1}
            />
          </div>
          <div
            className={'nextSlide'}
            onTransitionEnd={(e: any) => {
              if (e.propertyName === 'left') {
                e.target.style.transition = 'none';
                this.props.carouselStore!.setAnimating('');
                this.props.carouselStore!.increaseActiveIndex();
              }
            }}
            style={this.props.carouselStore!.animating === 'left' ?
              this.leftAnimation : {transition: 'none', left: '200%'}
            }
          >
            <StyledCarouselItem
              slide={this.props.slides[nextSlide]}
              changeTime={this.props.slidesActions!.setAndUpdateTime}
              changeActivity={this.props.slidesActions!.setAndUpdateActivity}
              callout={
                this.buildDropdown(this.props.slides[nextSlide])
              }
              count={(nextSlide + 1) + ' of ' + this.props.slidesStore!.undeletedSlides.length}
              tabIndex={3}
            />
          </div>
        </div>
      </div>
    );
  }
}

export const StyledCarousel = inject(
  'carouselActions', 'carouselStore', 'slidesActions', 'unicornStore', 'slidesStore')
(styled(Carousel)`
    z-index: 500;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8);
    
  .next, .previous {
    z-index: 5005;
    cursor: pointer;
    height: 50px;
    width: 50px;
    top: 400px;
  }
  
  .previous {
    transform: rotate(180deg);
    position: relative;
    left: 5vw;
  }
  
  .next {
    position: relative;
    float: right;
    margin-right: 5vw;
  }
  
  .exitIcon {
    cursor: pointer;
    position: relative;
    left: 1450px;
    top: 60px;
    z-index: 505;
  }
  
  .dropdownBtn {
    width: 140px;
    left: -26px;
    color: #15deec;
  }
  
  .dd {
    left: 2px;
    width: 112px;
    max-height: 500px;
    overflow: scroll;
  }
 
 .ddd {
    font-size: 20px;
  }
  
  .imgControls {
    width: 1655px;
    margin: auto;
  }
  
  .currentSlide, .previousSlide, .nextSlide {
    transition: left 0.7s;
  }
  
  .currentSlide {
    position: relative;
    left: 0%;
  }
  
  .previousSlide {
    position: absolute;
    left: -200%;
    .carouselInputs {
      left: 31.8%;
    }
  }
  
  .nextSlide {
    position: absolute;
    top: 50px;
    left: 200%;
    .carouselInputs {
      left: 31.8%;
    }
  }
`);