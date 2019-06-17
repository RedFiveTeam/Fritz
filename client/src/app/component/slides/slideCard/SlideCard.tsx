import * as React from 'react';
import { CSSProperties } from 'react';
import { inject, observer } from 'mobx-react';
import { SlideModel } from '../models/SlideModel';
import { SlidesActions } from '../actions/SlidesActions';
import { SlidesStore } from '../store/SlidesStore';
import styled from 'styled-components';
import * as ReactDOM from 'react-dom';
import { MetricActions } from '../../metrics/actions/MetricActions';
import { UploadStore } from '../../form/upload/UploadStore';
import { StyledCallout } from '../../unicorn/Callout/Callout';
import { UnicornStore } from '../../unicorn/store/UnicornStore';
import { StyledValidatingInput } from '../../input/ValidatingInput';
import { StyledDatePicker } from '../../date/DatePicker';

const expandIcon = require('../../../../icon/ExpandIcon.svg');
const DeleteIcon = require('../../../../icon/DeleteIcon.svg');

interface Props {
  slideNumber: number;
  slideModel: SlideModel;
  thumbnailClick: (i: number) => void;
  slidesActions?: SlidesActions;
  slidesStore?: SlidesStore;
  uploadStore?: UploadStore;
  metricActions?: MetricActions;
  deletedCount?: number;
  unicornStore?: UnicornStore;
  first?: boolean;
  className?: string;
}

@observer
export class SlideCard extends React.Component<Props> {
  timeBox: any;
  activityBox: any;
  goodCSS: CSSProperties = {};

  constructor(props: Props) {
    super(props);
    this.timeBox = React.createRef();
    this.activityBox = React.createRef();
  }

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
    this.setFocus();
    let activityInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#activityInput') as HTMLInputElement;
    let timeInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#timeInput') as HTMLInputElement;
    if (activityInput) {
      activityInput.value = this.props.slideModel.activity === 'ACTY' ? '' : this.props.slideModel.activity;
    }
    if (timeInput) {
      timeInput.value = this.props.slideModel.time === 'TTTT' ? '' : this.props.slideModel.time;
    }
  }

  setFocus() {
    if (this.props.first) {
      if (!this.props.slideModel.isValidTime) {
        this.timeBox.current.focus();
      } else {
        this.activityBox.current.focus();
      }
    }
  }

  getSlideName = (s: SlideModel, idx: number) => {
    return (
      <div key={idx} className="slide">
        {
          this.props.slideModel.dateEdited ?
            this.props.slideModel.day :
            this.props.slidesStore!.day
        }
        {
          s.time === 'TTTT' ? <span><span className="text-info font-italic">TTTT</span>Z</span> :
            !s.isValidTime ? <span className="text-info font-italic">TTTTZ</span> : <span>{s.time}Z</span>}
        {
          this.props.slideModel.dateEdited ?
            this.props.slideModel.month!.toUpperCase() :
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
      <div
        className={this.props.className + ' slideCard'}
      >
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={'api/image/' + this.props.uploadStore!.hash + '/' +
                this.props.slideModel.oldName.replace('.JPG', '.jpg')}
                className="card-img calloutImg"
                onClick={() => {
                  this.props.thumbnailClick(this.props.slideNumber - this.props.deletedCount!);
                }}
              />
              <div
                className="expandText"
                onClick={() => {
                  this.props.thumbnailClick(this.props.slideNumber - this.props.deletedCount!);
                }}
              >
                <span>Click to Expand</span>
              </div>
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
              {!this.props.unicornStore!.uploadsInProgress && this.props.slideModel.uploading !== false &&
              <img
                className="deleteIcon"
                onClick={async () => {
                  await this.props.slidesActions!.deleteSlide(this.props.slideModel);
                }}
                src={DeleteIcon}
              />
              }
              {this.props.slideModel.uploading === null || this.props.slideModel.failed ?
                <div>
                  <h5 className="card-title">{this.getSlideName(this.props.slideModel, this.props.slideNumber)}</h5>
                  <div className="slidesInputs">
                    <StyledDatePicker
                      slide={this.props.slideModel}
                    />
                    <StyledValidatingInput
                      label={'Time'}
                      placeholder={'e.g. 0830'}
                      listener={(e: any) => {
                        this.props.slidesActions!.setAndUpdateTime(this.props.slideModel, e);
                      }}
                      id={'timeInput'}
                      validator={this.props.slideModel.isValidTime}
                      value={this.props.slideModel.time}
                      errorMessage={'Invalid time'}
                      onlyValidateOnExit={true}
                      reference={this.timeBox}
                    />
                    <div className="activityInputField">
                      <label>
                        Activity
                      </label>
                      <input
                        maxLength={64}
                        onChange={(e: any) => {
                          this.props.slidesActions!.setAndUpdateActivity(
                            this.props.slideModel, e
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
                        ref={this.activityBox}
                      />
                    </div>
                  </div>
                </div>
                :
                <div className="whileUploading">
                  <span className="whileUploadingTitle">
                    JPEG Name
                  </span>
                  <span>
                    {this.props.slideModel.newName}
                  </span>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="cardSpacer"/>
        <StyledCallout
          slide={this.props.slideModel}
        />
      </div>
    );
  }
}

export const StyledSlideCard = inject(
  'slidesActions', 'slidesStore', 'metricActions', 'uploadStore', 'unicornStore'
)(styled(SlideCard)`
  
  width: 860px;
  display: inline-block;
  height: 170px;
  margin-right: 17px;
  position: relative;
  margin-bottom: 6px;

  input {
    width: 132px;
    color: #fff;
    background-color:rgba(0, 0, 0, 0);
  }
  
  .expandBackground {
    height: 34px;
    width: 33px;
    background: rgba(43, 48, 60, 0.557886);
    position: absolute;
    right: 86px;
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
    width: 400px;
    font-size: 14px;
    right: 60px;
    top: 14px;
    position: relative;
    font-weight: bold;
  }
  
  .expandImg {
    width: 20px;
    height: 20px;
  }
  
  .wrongTime {
    position: absolute;
    color: #e46373; 
  }
  
  .slideCounter {
    position: absolute;
    text-align: center;
    width: 54px;
    height: 23px;
    left: 0;
    background: rgba(43, 48, 60, 0.557886);
    color: white;
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
    bottom: -15px;
    margin-left: -10%;
  }
  
  .calloutImg {
    object-fit: cover;
    width: 70%;
    height: 167px;
    cursor: pointer;
  }
  
  #timeInput {
    position: relative;
    display: block;
    float: left;
    margin-right: 6%;
    z-index: 1;
  }
  
  .activityInputField {
    position: relative;
    display: block;
    left: 277px;
    bottom: 102px;
  }
  
  .deleteIcon {
    width: 24px;
    height: 24px;
    position: absolute;
    right: -30px;
    top: 8px;
    cursor: pointer;
  }
  
  .slide {
    width: 430px;
    white-space: pre-wrap;
  }
  
  .cardSpacer {
    position: absolute;
    width: 3px;
    height: 145px;
    top: 10px;
    right: 186px;
    background-color: rgba(108, 127, 156, 0.5);
  }
  
  .whileUploading {
    position: absolute;
    display: inline-block;
    right: 200px;
    top: 38px;
    width: 440px;
    white-space: pre-wrap;
    
    span {
      display: block;
    }
    
    span:nth-of-type(2) {
      font-weight: bold;
    }
  }
  
  .whileUploadingTitle {
    font-size: 14px;
    color: #6c7f9c;
  }
  
  .expandText {
    width: 200.19px;
    height: 167px;
    top: 0px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.5s;
    cursor: pointer;
    
    span {
      display: none;
    }
    
    :hover {
      background-color: rgba(0, 0, 0, 0.6);
      
      span {
        display: block;
        color: #fff;
        left: 50%;
        top: 50%;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
        position: relative;
        transform: translate(-50%, -50%);
      }
    }
  }
  
  .controlUnit {
    display: inline-block;
    position: relative;
    left: 118px;
    bottom: 32px;
  }
  
  .errorMessage {
    top: 70px;
    left: 3px;
  }
`);