import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlideModel } from '../slides/models/SlideModel';

const ArrowIcon = require('../../../icon/DatePickerArrow.svg');

interface Props {
  className?: string;
  slide: SlideModel;
}

@observer
export class DatePicker extends React.Component<Props> {

  displayDate() {
    let slide = this.props.slide;
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return slide.date!.getDate() + ' ' + months[slide.date!.getMonth()];
  }

  render() {
    return (
      <div className={this.props.className + ' datePicker'}>
        <label>Date</label>
        <div className={'selectedDate'}>
          <span>{this.displayDate()}</span>
        </div>
        <div className={'buttons'}>
          <div
            className={'upArrow'}
            onClick={() => {
              this.props.slide.incrementDay();
              this.props.slide.setDateEdited(true);
            }}
          >
            <img src={ArrowIcon}/>
          </div>
          <div
            className={'downArrow'}
            onClick={() => {
              this.props.slide.decrementDay();
              this.props.slide.setDateEdited(true);
            }}
          >
            <img src={ArrowIcon}/>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledDatePicker = inject()(styled(DatePicker)`
  
  position: relative;
  top: 38px;
  width: 88px;
  height: 38px;
  border-radius: 4px;
  border: solid 1px #ccc;
  font-size: 16px;
  
  .upArrow, .downArrow {
    background-color: #00818c;
    height: 17px;
    width: 23px;
    position: relative;
    text-align: center;
  }
  
  .selectedDate, .buttons {
    position: relative;
    display: inline-block;
    color: #eaf3ff;
  }
  
  .selectedDate {
    width: 63px;
    bottom: 13px;
    text-align: center;
  }
  
  .buttons {
    width: 23px;
    height: 38px;
    cursor: pointer;
  }
  
  label {
    position: absolute;
    color: #fff;
    bottom: 30px;
    left: 2px;
  }
  
  .upArrow {
    border-radius: 0 4px 0 0;
    margin-bottom: 2px;
  }
  
  .downArrow {
    border-radius: 0 0 4px 0;
    
    img {
      transform: rotateX(180deg);
    }
  }
  
  img {
    position: relative;
    bottom: 4px;
  }

`);