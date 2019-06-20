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
import { StyledCalloutDropdown } from '../../unicorn/Callout/CalloutDropdown';
import { UnicornStore } from '../../unicorn/store/UnicornStore';
import { StyledValidatingInput } from '../../input/ValidatingInput';
import { StyledDatePicker } from '../../date/DatePicker';
import { StyledSlideName } from '../SlideTitle';

const expandIcon = require('../../../../icon/ExpandIcon.svg');
const DeleteIcon = require('../../../../icon/DeleteIcon.svg');

interface Props {
  slideNumber: number;
  slide: SlideModel;
  thumbnailClick: (i: number) => void;
  slidesActions?: SlidesActions;
  slidesStore?: SlidesStore;
  uploadStore?: UploadStore;
  metricActions?: MetricActions;
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
    let {slide} = this.props;

    let activityInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#activityInput') as HTMLInputElement;
    let timeInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#timeInput') as HTMLInputElement;
    if (activityInput) {
      activityInput.value = slide.activity === 'ACTY' ? '' : slide.activity;
    }
    if (timeInput) {
      timeInput.value = slide.time === 'TTTT' ? '' : slide.time;
    }
  }

  componentDidMount() {
    let {slide} = this.props;

    this.setFocus();
    let activityInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#activityInput') as HTMLInputElement;
    let timeInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#timeInput') as HTMLInputElement;
    if (activityInput) {
      activityInput.value = slide.activity === 'ACTY' ? '' : slide.activity;
    }
    if (timeInput) {
      timeInput.value = slide.time === 'TTTT' ? '' : slide.time;
    }
  }

  setFocus() {
    let {slide} = this.props;

    if (this.props.first) {
      if (!slide.isValidTime) {
        this.timeBox.current.focus();
      } else {
        this.activityBox.current.focus();
      }
    }
  }

  render() {
    return (
      <div className={this.props.className + ' slideCard'}>
        {this.displayThumbnail()}
        {this.displayTitleAndInputs()}
        {this.displaySeparatingLine()}
        {this.displayCalloutInfo()}
        {this.displayDelete()}
      </div>
    );
  }

  private displayThumbnail() {
    let {slide, slideNumber, slidesStore} = this.props;

    return (
      <div className={'thumbnail'}>
        <img
          src={'api/image/' + this.props.uploadStore!.hash + '/' +
          slide.oldName.replace('.JPG', '.jpg')}
          className={'calloutImage'}
          onClick={() => {
            this.props.thumbnailClick(slideNumber);
          }}
        />
        <div
          className={'expandText'}
          onClick={() => {
            this.props.thumbnailClick(slideNumber);
          }}
        >
          <span>Click to Expand</span>
        </div>
        <div className={'thumbnailOverlay'}>
        <span
          className={'slideCounter'}
        >
          {
            (slideNumber + 1) +
            ' of ' + slidesStore!.undeletedSlides.length
          }
        </span>
          <span className={'expandBackground'}>
          <img className={'expandImg'} src={expandIcon}/>
        </span>
        </div>
      </div>
    );
  }

  private displayTitleAndInputs() {
    let {slide, slidesStore, slidesActions} = this.props;
    if (slide.uploading === null || slide.failed) {
      return (
        <div className={'titleAndInputs'}>
          <StyledSlideName
            slide={slide}
            opName={slidesStore!.opName}
            asset={slidesStore!.asset}
            releasability={slidesStore!.releasability}
          />
          <div className={'slideInputs'}>
            <StyledDatePicker
              slide={slide}
            />
            <StyledValidatingInput
              label={'Time'}
              className={'timeInput'}
              placeholder={'e.g. 0830'}
              listener={(e: any) => {
                slidesActions!.setAndUpdateTime(slide, e);
              }}
              id={'timeInput'}
              validator={slide.isValidTime}
              value={slide.time}
              errorMessage={'Invalid time'}
              onlyValidateOnExit={true}
              reference={this.timeBox}
            />
              <StyledValidatingInput
                className={'activityInput'}
                placeholder={'e.g. OV'}
                listener={(e: any) => {
                  slidesActions!.setAndUpdateActivity(slide, e);
                }}
                id={'activityInput'}
                validator={true}
                value={slide.activity}
                reference={this.activityBox}
                label={'Activity'}
              />
          </div>
        </div>
      );
    } else {
      return (
        <div className={'whileUploading'}>
          <span className={'whileUploadingTitle'}>
          JPEG Name
          </span>
          <span>
          {slide.newName}
          </span>
        </div>
      );
    }
  }

  private displaySeparatingLine() {
    return (
      <div className={'separatingLine'}/>
    );
  }

  private displayCalloutInfo() {
    return (
      <StyledCalloutDropdown
        slide={this.props.slide}
      />
    );
  }

  private displayDelete() {
    let {slide, slidesActions} = this.props;

    return (
      <div className={'delete'}>
        {
          !this.props.unicornStore!.uploadsInProgress
          && slide.uploading !== false
          &&
          <img
            className={'deleteIcon'}
            onClick={async () => {
              await slidesActions!.deleteSlide(slide);
            }}
            src={DeleteIcon}
          />
        }
      </div>
    );
  }
}

export const StyledSlideCard = inject(
  'slidesActions', 'slidesStore', 'metricActions', 'uploadStore', 'unicornStore'
)(styled(SlideCard)`
          display: flex;
          flex-direction: row;
          height: 168px;
          margin-bottom: 6px;
          background-color: #191E2A;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          border-radius: 2px;

          .thumbnail {
          width: 168px;
          display: grid;
          border-radius: 4px;
          > * {
          grid-row: 1;
          grid-column: 1;
          border-radius: inherit;
        }

          .slideCounter {
          text-align: center;
          width: 54px;
          height: 23px;
          background: rgba(43, 48, 60, 0.557886);
          color: white;
          font-style: normal;
          font-size: 14px;
          font-weight: 500;
          border-top-left-radius: 4px;
        }

          .calloutImage {
          width: inherit;
          object-fit: cover;
          height: 167px;
          cursor: pointer;
        }

          .expandBackground {
          height: 34px;
          width: 33px;
          background: rgba(43, 48, 60, 0.557886);
          right: 86px;
          text-align: center;
          line-height: 29px;
          vertical-align: middle;
          pointer-events: none;
          border-top-right-radius: 4px;
        }

          .thumbnailOverlay {
          display: flex;
          justify-content: space-between;
        }

          .expandImg {
          width: 20px;
          height: 20px;
        }

          .expandText {
          height: 168px;
          background-color: rgba(0, 0, 0, 0);
          transition: background-color 0.5s;
          cursor: pointer;
          z-index: 100;

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
        }

          .titleAndInputs {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 20px;

          .slideInputs {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 30px;
          margin-top: 15px;
        }

          .slideTitle {
          overflow-wrap: break-word;
          white-space: pre-wrap;
          margin-top: 14px;
        }
        }

          .separatingLine {
          border: .5px solid rgba(108, 127, 156, 0.5);
          margin-top: 10px;
          margin-bottom: 10px;
          margin-left: 70px;
          width: .5px;
          position: relative;
        }

          .delete {
          position: absolute;
          right: 9px;
        }
          .deleteIcon {
          width: 24px;
          height: 24px;
          top: 8px;
          cursor: pointer;
        }

          }

          input {
          width: 132px;
          color: #fff;
          background-color:rgba(0, 0, 0, 0);

          :focus {
          background-color:rgba(0, 0, 0, 0);
          color: #fff;
          border: #15deec solid 1px;
        }
        }

          label {
          font - size: 16px;
        }

          .card-body {
          display: block;
          position: relative;
          right: 15%;
          width: 110%;
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
          font - size: 14px;
          color: #6c7f9c;
        }
          `);