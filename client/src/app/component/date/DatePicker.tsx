import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlideModel } from '../slides/models/SlideModel';

const ArrowIcon = require('../../../icon/DatePickerArrow.svg');

interface Props {
  slide: SlideModel;
  className?: string;
}

@observer
export class DatePicker extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.className + ' datePicker'}>
        <label>Date</label>
        <div className={'dateBox'}>
          <div className={'selectedDate'}>
            <span>{this.props.slide.displayDate}</span>
          </div>
          <div className={'arrows'}>
            <div
              className={'upArrow'}
              onClick={() => {
                this.props.slide.incrementDay();
              }}
            >
              <img src={ArrowIcon}/>
            </div>
            <div
              className={'downArrow'}
              onClick={() => {
                this.props.slide.decrementDay();
              }}
            >
              <img src={ArrowIcon}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledDatePicker = inject()(styled(DatePicker)`
  width: 88px;
  font-size: 16px;
  
  .dateBox {
    height: 38px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: solid 1px #ccc;
    border-radius: 4px;
    color: #eaf3ff;
  }
  
  .arrows {
    height: 36px;
    width: 23px;
    text-align: center;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  
  .selectedDate {
    width: 63px;
    text-align: center;
  }
  
  label {
    color: #fff;
    margin-bottom: 8px;
  }
  
  .upArrow, .downArrow {
    background-color: #00818c;
    display: flex;
    flex-grow: 1;
    justify-content: center;
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
`);