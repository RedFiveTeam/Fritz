import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlidesStore } from '../slides/SlidesStore';
import { SlideModel } from '../slides/SlideModel';
import { SlidesActions } from '../slides/actions/SlidesActions';

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
      <div
        className={this.props.className + ' expandedView'}
      >
        <div
          id="carousel"
          className="carousel slide"
          data-ride="false"
          data-interval="false"
        >
          <div className="carousel-inner">
            {
              this.props.slidesStore!.slides.map((s, idx) => {
                return (
                  <div
                    key={idx}
                    className="carousel-item"
                  >
                    <img src={'/api/image/' + idx + '?' + Date.now()} className="d-block" alt="..."/>
                    <div
                      className="numberAndTitle"
                    >
                      <div
                        className="slideNumber"
                      >
                        {idx + 1} of {this.props.slidesStore!.slides.length}
                      </div>
                      <div>{this.getSlideName(s, idx)}</div>
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
                              '.slideCardContainer:nth-of-type(' + (idx + 1) + ')')!
                              .querySelector('#timeInput') as HTMLInputElement;
                            ele.value = e.target.value;
                            this.props.slidesActions!.setAndUpdateTime(
                              s,
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
                          onChange={(e: any) => {
                            let ele = document.querySelector(
                              '.slideCardContainer:nth-of-type(' + (idx + 1) + ')')!
                              .querySelector('#activityInput') as HTMLInputElement;
                            ele.value = e.target.value;
                            this.props.slidesActions!.setAndUpdateActivity(
                              s,
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
              })
            }
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
          <a className="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"/>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"/>
            <span className="sr-only">Next</span>
          </a>
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

  input {
    width: 166px;
    color: #fff;
    background-color:rgba(0, 0, 0, 0);
  }
  
  label {
    font-size: 16px;
  }
  
  input:focus {
    background-color:rgba(0, 0, 0, 0);
    color: #fff;
    border: #15deec solid 1px;
  }
  
  .exitExpandIcon {
    width: 20px;
    height: 36px;
    opacity: 0.8;
  }
  
  .exitExpandIcon:hover {
    opacity: 1;
  }

  .slidesInputs {
    position: relative;
    display: block;
    bottom: 10px;
    width: 360px;
    margin: auto;
    margin-top: 12px;
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

  .slideNumber {
    font-size: 16px;
    margin: 18px;
  }

  .carousel {
    max-width: 1079px;
    margin: auto;
    top: 10%;
  }

  img {
    left: 10%;
    width: 860px;
    height: auto;
    position: relative;
  }
  
  .carousel-item {
    transition: transform 500ms ease, opacity 100ms ease-out
  }
  
  .numberAndTitle {
    text-align: center;
  }
  
  .carousel-control-prev-icon, .carousel-control-next-icon {
    height: 36px;
    width: 36px;
  }
  
  .carousel-control-prev {
    left: -50px;
  }
  
  .carousel-control-next {
    right: -50px;
  }
  
  
  a {
    height: 720px;
  }
  
  .exitExpand {
    width: 50px;
    height: 50px;
    align-items: center;
    position: absolute;
    right: 0;
    cursor: pointer;
    z-index: 20;
  }
`);