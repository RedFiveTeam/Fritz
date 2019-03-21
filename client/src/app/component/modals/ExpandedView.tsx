import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlidesStore } from '../slides/SlidesStore';
import { SlideModel } from '../slides/SlideModel';
import { SlidesActions } from '../slides/actions/SlidesActions';
import { StyledCarousel } from './Carousel';

const ExpandedCloseIcon = require('../../../icon/ExpandedCloseIcon.svg');

interface Props {
  className?: string;
  slidesStore?: SlidesStore;
  slidesActions?: SlidesActions;
}

@observer
export class ExpandedView extends React.Component<Props> {

  componentDidMount() {
    let ele = document.querySelector('.expandedView') as HTMLElement;
    if (ele !== null) {
      ele.onclick = (e: any) => {
        if (!ele.contains(e.target) || ele === e.target) {
          ele.style.display = 'none';
          let eles = document.querySelectorAll('.active');
          if (eles !== null) {
            for (let i = 0; i < eles.length; i++) {
              eles[i].classList.remove('active');
            }
          }
        }
      };
    }
  }

  componentDidUpdate() {
    let slides = this.props.slidesStore!.slides.filter((s) => {
      return s.deleted === false;
    });
    slides.map((s: SlideModel, idx: number) => {
      let ele = document.querySelector('.carousel-item:nth-of-type(' + (idx + 1) + ')');
      if (ele) {
        let activityInput = ele.querySelector('#activityInput') as HTMLInputElement;
        let timeInput = ele.querySelector('#timeInput') as HTMLInputElement;
        if (activityInput) {
          activityInput.value = s.activity === 'ACTY' ? '' : s.activity;
        }
        if (timeInput) {
          timeInput.value = s.time === 'TTTT' ? '' : s.time;
        }
      }
    });
  }

  render() {
    return (
      <div
        className={this.props.className + ' expandedView'}
      >
        <div
          id="carouselControls"
          className="carousel slide"
          data-ride="false"
          data-interval="false"
        >
          <div
            className="carousel-inner"
          >
            {
              this.props.slidesStore!.slides.map((s, idx) => {
                return (
                  !s.deleted &&
                  <StyledCarousel
                      key={idx}
                      slideModel={s}
                      slideNumber={idx}
                  />
                );
              })
            }
            <a className="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"/>
            </a>
            <a className="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"/>
            </a>
            <div
              className="exitExpand"
              onClick={() => {
                (document.querySelector('.expandedView') as HTMLElement).style.display = 'none';
                let eles = document.querySelectorAll('.active');
                if (eles !== null) {
                  for (let i = 0; i < eles.length; i++) {
                    eles[i].classList.remove('active');
                  }
                }
              }}
            >
              <img className="exitExpandIcon" src={ExpandedCloseIcon}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledExpandedView = inject('slidesStore', 'slidesActions')(styled(ExpandedView)`
     background: rgba(0, 0, 0, 0.8);
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     margin: auto;
     width: 100%;
     height: 100%;
     position: fixed;
     z-index: 100;
     display: none;
     color: #FFF;
     font-size: 22px;
        
    #carouselControls {
     top: 8%;
    }
        
    .carousel-inner {
      width: 1650px;
      margin: auto;
      overflow: visible;
    }
        
   .carousel-control-prev {
     left: 10%;
   }

   .carousel-control-next {
     right: 8%;
   }
   
   .carousel-control-prev-icon, .carousel-control-next-icon {
     height: 36px;
     width: 36px;
   }
   
   a {
     height: 720px;
   }
  
   
    .exitExpand {
     width: 40px;
     height: 50px;
     align-items: center;
     position: absolute;
     right: 14%;
     cursor: pointer;
     z-index: 20;
   }
   
      .exitExpandIcon {
     width: 20px;
     height: 36px;
     opacity: 0.8;
  }
  
     .exitExpandIcon:hover {
      opacity: 1;
  }
`);