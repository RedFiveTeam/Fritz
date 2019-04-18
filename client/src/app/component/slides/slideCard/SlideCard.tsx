import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SlideModel } from '../SlideModel';
import { SlidesActions } from '../actions/SlidesActions';
import { SlidesStore } from '../SlidesStore';
import styled from 'styled-components';
import * as ReactDOM from 'react-dom';
import { MetricActions } from '../../metrics/actions/MetricActions';
import { UploadStore } from '../../form/upload/UploadStore';

const expandIcon = require('../../../../icon/expandIcon.svg');
const DeleteIcon = require('../../../../icon/DeleteIcon.svg');

interface Props {
  className?: string;
  slideNumber: number;
  slideModel: SlideModel;
  slidesActions?: SlidesActions;
  slidesStore?: SlidesStore;
  uploadStore?: UploadStore;
  metricActions?: MetricActions;
  deletedCount?: number;
}

@observer
export class SlideCard extends React.Component<Props> {

  componentDidUpdate() {
    let activityInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#activityInput') as HTMLInputElement;
    let timeInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#timeInput') as HTMLInputElement;
    if (activityInput) {
      activityInput.value = this.props.slideModel.activity === 'ACTY' ? '' : this.props.slideModel.activity;
    }
    if (timeInput) {
      timeInput.value = this.props.slideModel.time === 'TTTT' ? '' : this.props.slideModel.time;
    }
  }

  componentDidMount() {
    let activityInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#activityInput') as HTMLInputElement;
    let timeInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#timeInput') as HTMLInputElement;
    if (activityInput) {
      activityInput.value = this.props.slideModel.activity === 'ACTY' ? '' : this.props.slideModel.activity;
    }
    if (timeInput) {
      timeInput.value = this.props.slideModel.time === 'TTTT' ? '' : this.props.slideModel.time;
    }
  }

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
          (this.props.slidesStore!.classification || 'CLASSIFICATION'))
          .split(' ').join('_').toUpperCase()
        }
      </div>
    );
  };

  deleteSlide = async () => {
    this.props.slideModel.setDeleted(true);
    await this.props.metricActions!.createMetric('Delete JPG');
  };

  render() {
    return (
      <div
        className={this.props.className + ' slideCard'}
      >
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={'api/image/' + this.props.uploadStore!.hash + '/' +
                this.props.slideModel.oldName.replace('.JPG', '.jpg')}
                className="card-img"
                onClick={() => {
                  let expandDisplay = (document.querySelector('.expandedView') as HTMLElement);
                  if (expandDisplay !== null) {
                    expandDisplay.style.display = 'block';
                  }
                  let carouselItem = (document.querySelector(
                    '.carousel-item:nth-of-type(' +
                    (this.props.slideNumber - this.props.deletedCount! + 1) + ')') as HTMLElement);
                  carouselItem.classList.add('active');
                  (carouselItem.querySelector('#timeInput') as HTMLInputElement).focus();
                }}
              />
              <span
                className="slideCounter"
              >
                {(this.props.slideNumber + 1) + ' of ' + this.props.slidesStore!.slides.length}
              </span>
              <span className="expandBackground">
                <img className="expandImg" src={expandIcon}/>
              </span>
            </div>
            <div className="col-md-8">
              <img className="deleteIcon" onClick={this.deleteSlide} src={DeleteIcon}/>
              <div className="card-body">
                <h5 className="card-title">{this.getSlideName(this.props.slideModel, this.props.slideNumber)}</h5>
              </div>
              <div className="slidesInputs">
                <div className="timeInputField">
                  <label>
                    Time
                  </label>
                  <input
                    maxLength={4}
                    onChange={(e: any) => {
                      let carouselItem = document.querySelector(
                        '.carousel-item:nth-of-type(' + (this.props.slideNumber + 1) + ')');
                      if (carouselItem) {
                        let input = carouselItem.querySelector('#timeInput') as HTMLInputElement;
                        if (input) {
                          input.value = e.target.value;
                        }
                      }
                      this.props.slidesActions!.setAndUpdateTime(this.props.slideModel, e.target.value.toUpperCase());
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
                      this.props.slidesActions!.setAndUpdateActivity(
                        this.props.slideModel,
                        e.target.value.toUpperCase()
                      );
                      let carouselItem = document.querySelector(
                        '.carousel-item:nth-of-type(' + (this.props.slideNumber + 1) + ')');
                      if (carouselItem) {
                        let input = carouselItem.querySelector('#activityInput') as HTMLInputElement;
                        if (input) {
                          input.value = this.props.slideModel.activity!;
                        }
                      }
                    }}
                    type="text"
                    className="form-control"
                    id="activityInput"
                    placeholder="e.g. OV"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledSlideCard = inject('slidesActions', 'slidesStore', 'metricActions', 'uploadStore')(styled(SlideCard)`
  input {
    width: 166px;
    color: #fff;
    background-color:rgba(0, 0, 0, 0);
  }
  
  .expandBackground {
    height: 34px;
    width: 33px;
    background: rgba(43, 48, 60, 0.557886);
    position: absolute;
    right: 74px;
    text-align: center;
    line-height: 29px;
    vertical-align: middle;
    pointer-events: none;
  }
  
  label {
    font-size: 16px;
  }
  
  input:focus {
    background-color:rgba(0, 0, 0, 0);
    color: #fff;
    border: #15deec solid 1px;
  }

  .card {
    background-color: #191E2A;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    height: 168px;
  }
  
  .card-title {
    font-size: 14px;
  }
  
  .expandImg {
    width: 20px;
    height: 20px;
  }
  
  .slideCounter {
    position: absolute;
    text-align: center;
    width: 54px;
    height: 23px;
    left: 0;
    background: rgba(43, 48, 60, 0.557886);
    color: white;
    font-family: Helvetica Neue;
    font-style: normal;
    font-size: 14px;
    font-weight: 500;
  }
  
  .card-body {
    display: block;
    position: relative;
    right: 15%;
    width: 110%;
  }
  
  .slidesInputs {
    position: relative;
    display: block;
    bottom: 10px;
    margin-left: -8%;
  }
  
  img {
    object-fit: cover;
    width: 70%;
    height: 167px;
    cursor: pointer;
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
  
  .deleteIcon {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 0;
    top: 8px;
    cursor: pointer;
  }
`);