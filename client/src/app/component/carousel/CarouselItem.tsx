import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlideModel } from '../slides/models/SlideModel';
import { StyledValidatingInput } from '../input/ValidatingInput';
import { SlidesStore } from '../slides/store/SlidesStore';
import { CarouselActions } from './CarouselActions';

interface Props {
  slide: SlideModel;
  slidesStore?: SlidesStore;
  carouselActions?: CarouselActions;
  changeTime: (slide: SlideModel, e: any) => any;
  changeActivity: (slide: SlideModel, e: any) => any;
  className?: string;
  callout?: any;
  count?: any;
  tabIndex?: number;
}

@observer
export class CarouselItem extends React.Component<Props> {

  imagePath(): string {
    return (
      `api/image/${this.props.slide.hash}/${this.props.slide.oldName}.jpg`
    );
  }

  getSlideName = (s: SlideModel, idx: number) => {
    return (
      <div key={idx} className="slide">
        {
          this.props.slidesStore!.day
        }
        {
          s.time === 'TTTT' ? <span><span className="text-info font-italic">TTTT</span>Z</span> :
            !s.isValidTime ? <span className="text-info font-italic">TTTTZ</span> : <span>{s.time}Z</span>}
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
          </div>
        </div>
        <div className={'carouselInputs'}>
          <StyledValidatingInput
            label={'Time'}
            placeholder={'e.g. 0830'}
            listener={(e: any) => {
              if (e.keyCode === 9 && e.shiftKey) {
                e.preventDefault();
                this.props.carouselActions!.previous();
              }
              this.props.changeTime(this.props.slide, e);
            }}
            id={'time-input'}
            validator={this.props.slide.isValidTime}
            value={this.props.slide.time}
            errorMessage={'Invalid time'}
            onlyValidateOnExit={true}
            tabIndex={this.props.tabIndex}
          />
          <label className={'activityLabel'}>
            Activity
          </label>
          <StyledValidatingInput
            label={'Activity'}
            placeholder={'Activity'}
            listener={(e: any) => {
              if (e.keyCode === 9) {
                this.props.carouselActions!.next();
              }
              this.props.changeActivity(this.props.slide, e);
            }}
            value={this.props.slide.activity === 'ACTY' ? '' : this.props.slide.activity}
            id={'activityInput'}
            validator={true}
            tabIndex={this.props.tabIndex! + 1}
          />
        </div>
      </div>
    );
  }
}

export const StyledCarouselItem = inject('slidesStore', 'carouselActions')(styled(CarouselItem)`

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
  
`);