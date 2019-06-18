import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlideModel } from '../slides/models/SlideModel';
import { StyledValidatingInput } from '../input/ValidatingInput';
import { SlidesStore } from '../slides/store/SlidesStore';
import { CarouselActions } from './CarouselActions';
import { StyledDatePicker } from '../date/DatePicker';
import { SlidesActions } from '../slides/actions/SlidesActions';
import { CarouselStore } from './CarouselStore';

const DeleteIcon = require('../../../icon/DeleteIcon.svg');

interface Props {
  slide: SlideModel;
  slidesStore?: SlidesStore;
  slidesActions?: SlidesActions;
  carouselActions?: CarouselActions;
  carouselStore?: CarouselStore;
  changeTime: (slide: SlideModel, e: any) => any;
  changeActivity: (slide: SlideModel, e: any) => any;
  className?: string;
  callout?: any;
  count?: any;
  tabIndex?: number;
  active?: boolean;
}

@observer
export class CarouselItem extends React.Component<Props> {
  carouselTimeBox: any;
  carouselActivityBox: any;

  constructor(props: Props) {
    super(props);
    this.carouselTimeBox = React.createRef();
    this.carouselActivityBox = React.createRef();
  }

  componentDidMount(): void {
    this.setFocus();
  }

  setFocus() {
    if (this.props.active) {
      if (!this.props.slide.isValidTime) {
        this.carouselTimeBox.current.focus();
      } else {
        this.carouselActivityBox.current.focus();
      }
    }
  }

  imagePath(): string {
    return (
      `api/image/${this.props.slide.hash}/${this.props.slide.oldName}`
    );
  }

  getSlideName = (s: SlideModel, idx: number) => {
    return (
      <div key={idx} className="slide">
        {
          s.dateEdited ?
            s.day :
            this.props.slidesStore!.day
        }
        {
          s.time === 'TTTT' ? <span><span className="text-info font-italic">TTTT</span>Z</span> :
            !s.isValidTime ? <span className="text-info font-italic">TTTTZ</span> : <span>{s.time}Z</span>}
        {
          s.dateEdited ?
            s.month!.toUpperCase() :
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
      <div className={this.props.className}>
        <div className="imgContainer">
          <img
            className={'expandedImage'}
            src={this.imagePath()}
          />
          <div className={'calloutDropdown'}>
            {this.props.callout}
          </div>
        </div>
        <div className={'slideInfo'}>
          <div className={'slideCount'}>
            {this.props.count}
          </div>
          <div className={'slideTitle'}>
            {this.getSlideName(this.props.slide, 0)}
            <div>
              <img
                className={'delete'}
                src={DeleteIcon}
                onClick={async () => {
                  this.props.carouselStore!.decreaseItemCount();
                  await this.props.slidesActions!.deleteSlide(this.props.slide);
                }}
              />
            </div>
          </div>
        </div>
        <div className={'carouselInputs'}>
          <StyledDatePicker
            slide={this.props.slide}
          />
          <StyledValidatingInput
            placeholder={'e.g. 0830'}
            listener={(e: any) => {
              this.props.changeTime(this.props.slide, e);
            }}
            id={'time-input'}
            validator={this.props.slide.isValidTime}
            value={this.props.slide.time}
            errorMessage={'Invalid time'}
            onlyValidateOnExit={true}
            tabIndex={this.props.tabIndex}
            reference={this.carouselTimeBox}
            keyDown={(e: any) => {
              if (e.keyCode === 9 && e.shiftKey) {
                e.preventDefault();
                this.props.carouselActions!.previous();
              }
            }}
          />
          <StyledValidatingInput
            placeholder={'Activity'}
            listener={(e: any) => {
              this.props.changeActivity(this.props.slide, e);
            }}
            value={this.props.slide.activity === 'ACTY' ? '' : this.props.slide.activity}
            id={'activityInput'}
            validator={true}
            tabIndex={this.props.tabIndex! + 1}
            reference={this.carouselActivityBox}
            keyDown={(e: any) => {
              if (e.keyCode === 9) {
                e.preventDefault();
                this.props.carouselActions!.next();
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export const StyledCarouselItem = inject('slidesStore', 'carouselActions', 'carouselStore', 'slidesActions')
(styled(CarouselItem)`

  .imgContainer {
    position: relative;
    width: 1280px;
    margin: auto;
  }
  
  .slideInfo {
    position: relative;
    bottom: 50px;
    text-align: center;
  }

  .expandedImage {
    width: 1280px;
    height:  720px;
    display: block;
    position: relative;
  }
  
  input {
    width: 100%;
    color: #fff;
    background-color:rgba(0, 0, 0, 0);
    border-radius: 4px;
    border: 1px solid #ced4da;
    padding-left: 9px;
  }
  
  input:focus {
    background-color:rgba(0, 0, 0, 0);
    color: #fff;
    border: #15deec solid 1px;
  }
  
  label {
    color: #FFF;
  }
  
  .calloutDropdown {
    position: relative;
    bottom: 720px;
    left: 1165px;
    width: 117px;
    height: 44px;
    
    .li-label {
      color: #15DEEC;
      opacity: 1 !important;
    }
    
    .dropdown-item {
      padding: 0;
      justify-content: center;
      color: #15deec;
      font-weight: bold;
    }
  
    ul {
     width: 117px;
    }
  }
  
  .activityInput {
    width: 193px;
    height: 38px;
    top: 32px;
    position: relative;
  }
  
  .activityLabel {
    position: relative;
    left: 54px;
  }
  
  .slideTitle {
    color: #FFF;
    font-size: 22px;
    display: inline-block;
    
    > div {
      display: inline-block;
      
      > img {
        display: inline-block;
        margin-left: 16px;
        margin-bottom: 4px;
        cursor: pointer;
      }
    }
  }
  
  .slideCount {
    font-size: 16px;
    color: #FFF;
  }
  
  #time-input {
    width: 193px;
  }
  
  .carouselInputs {
    position: relative;
    display: inline-flex;
    bottom: 50px;
    left: 36%;
  }
  
  .datePicker {
    top: 24px;
    right: 16px;
  }
  
  .datePicker > label {
    display: none;
  }
  
  .controlUnit:nth-child(2) {
    margin-right: 24px;
  }
  
  
`);