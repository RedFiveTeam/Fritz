import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlideModel } from '../SlideModel';
import { SlidesActions } from '../actions/SlidesActions';
import { SlidesStore } from '../SlidesStore';

interface Props {
  className?: string;
  slideNumber: number;
  slideModel: SlideModel;
  slidesActions?: SlidesActions;
  slidesStore?: SlidesStore;
}

@observer
export class SlideCard extends React.Component<Props> {
  getSlideName = (s: SlideModel, idx: number) => {
    return (
      <div key={idx} className="slide">
        {
          ((this.props.slidesStore!.date && this.props.slidesStore!.date!.substr(0, 2)) || 'DD')
        }
        {s.time.indexOf('TTTT') > -1 ? <span className="text-info font-italic">TTTT</span> : s.time}
        {
          (((this.props.slidesStore!.date && this.props.slidesStore!.date!.substr(6, 6)) || 'ZMONYY') + '_' +
            (this.props.slidesStore!.opName || 'TGT_NAME') + '_')
            .split(' ').join('_').toUpperCase()
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
        className={this.props.className}
      >
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={'api/image/' + this.props.slideNumber} className="card-img" alt="..."/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{this.getSlideName(this.props.slideModel, this.props.slideNumber)}</h5>
              </div>
              <div className="slidesInputs">
                <label>
                  Activity
                </label>
                <input
                  maxLength={64}
                  onChange={(e: any) => {
                    this.props.slidesActions!.setAndUpdateActivity(this.props.slideModel, e.target.value.toUpperCase());
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
    );
  }
}

export const StyledSlideCard = inject('slidesActions', 'slidesStore')(styled(SlideCard)`
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

  .card {
    background-color: #191E2A;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    height: 168px;
  }
  
  .card-title {
    font-size: 14px;
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
    margin-left: 36%;
    bottom: 10px;
  }
  
  img {
    object-fit: cover;
    width: 70%;
    height: 167px;
  }
`);