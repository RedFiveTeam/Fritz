import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const flame = require('../../../icon/FlameIcon.svg');
const arrow = require('../../../icon/ArrowIcon.svg');
const unicorn = require('../../../icon/UnicornIcon.svg');

interface Props {
  className?: string;
}

@observer
export class UnicornUploadModal extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="titleBackground modal">
          <div className="title">
            Upload To Unicorn
          </div>
          <div className="allIcons">
            <img src={flame} id="flameIcon"/>
            <div className="arrowGroup">
              <img src={arrow}/>
              <img src={arrow}/>
              <img src={arrow}/>
              <img src={arrow}/>
              <img src={arrow}/>
              <img src={arrow}/>
            </div>
            <img src={unicorn} id="unicorn"/>
          </div>
          <div className="modalText">
            One moment please, we're uploading your JPEGs to Unicorn
          </div>
        </div>

      </div>
    );
  }
}

export const StyledUnicornUploadModal = styled(UnicornUploadModal)`
 background: rgba(0, 0, 0, 0.5);
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  position: fixed;
  z-index: 100;
  
  .allIcons {
    display: inline-flex;
    position: relative;
    top: 72px;
  }
  
  .modal {
    display: block;
    width: 840px;
    height: 490px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.5);
    background-color: #2b303c;
  }

  .title {
    height: 60px;
    line-height: 60px;
    padding-left: 21px;
    background-color: #1f1f2c;
    color: white;
    font-weight: bold;
    letter-spacing: 1.1px;
    font-size: 30px;
    
    span:nth-of-type(2) {
      position: absolute;
      left: 655px;
      color: #6c7f9c;
      font-weight: 300;
      letter-spacing: 0.9px;
    }
  }
  
  @keyframes first {
    0%   {opacity: 1;}
    10%  {opacity: 0.9;}
    20%  {opacity: 0.8;}
    30%  {opacity: 0.7;}
    40%  {opacity: 0.6;}
    50%  {opacity: 0.5;}
    60%  {opacity: 0.4;}
    70%  {opacity: 0.3;}
    80%  {opacity: 0.2;}
    90%  {opacity: 0.2;}
    100% {opacity: 0.2;}
  }
  
  @keyframes second {
    0%   {opacity: 0.2;}
    10%  {opacity: 0.2;}
    20%  {opacity: 1;}
    30%  {opacity: 0.9;}
    40%  {opacity: 0.8;}
    50%  {opacity: 0.7;}
    60%  {opacity: 0.6;}
    70%  {opacity: 0.5;}
    80%  {opacity: 0.4;}
    90%  {opacity: 0.3;}
    100% {opacity: 0.2;}
  }
  
  @keyframes third {
    0%   {opacity: 0.2;}
    10%  {opacity: 0.2;}
    20%  {opacity: 0.2;}
    30%  {opacity: 0.2;}
    40%  {opacity: 1;}
    50%  {opacity: 0.9;}
    60%  {opacity: 0.8;}
    70%  {opacity: 0.7;}
    80%  {opacity: 0.6;}
    90%  {opacity: 0.5;}
    100% {opacity: 0.4;}
  }
  
  @keyframes fourth {
    0%   {opacity: 0.2;}
    10%  {opacity: 0.2;}
    20%  {opacity: 0.2;}
    30%  {opacity: 0.2;}
    40%  {opacity: 0.2;}
    50%  {opacity: 0.2;}
    60%  {opacity: 1;}
    70%  {opacity: 0.9;}
    80%  {opacity: 0.8;}
    90%  {opacity: 0.7;}
    100% {opacity: 0.6;}
  }
  
  @keyframes fifth {
    0%   {opacity: 0.2;}
    10%  {opacity: 0.2;}
    20%  {opacity: 0.2;}
    30%  {opacity: 0.2;}
    40%  {opacity: 0.2;}
    50%  {opacity: 0.2;}
    60%  {opacity: 0.2;}
    70%  {opacity: 0.2;}
    80%  {opacity: 1;}
    90%  {opacity: 0.9;}
    100% {opacity: 0.8;}
  }
  
  @keyframes sixth {
    0%   {opacity: 0.2;}
    10%  {opacity: 0.2;}
    20%  {opacity: 0.2;}
    30%  {opacity: 0.2;}
    40%  {opacity: 0.2;}
    50%  {opacity: 0.2;}
    60%  {opacity: 0.2;}
    70%  {opacity: 0.2;}
    80%  {opacity: 0.2;}
    90%  {opacity: 0.2;}
    100% {opacity: 1;}
  }
  
  .arrowGroup {
    position: relative;
    display: inline-flex;
    top: 13px;
    left: 140px;
    width: 300px;
    
    img:nth-of-type(1) {
      animation: infinite;
      animation-duration: 1s;
      animation-name: first;
    }
    
    img:nth-of-type(2) {
      animation: infinite;
      animation-duration: 1s;
      animation-name: second;
    }
    
    img:nth-of-type(3) {
      animation: infinite;
      animation-duration: 1s;
      animation-name: third;
    }
    
    img:nth-of-type(4) {
      animation: infinite;
      animation-duration: 1s;
      animation-name: fourth;
    }
    
    img:nth-of-type(5) {
      animation: infinite;
      animation-duration: 1s;
      animation-name: fifth;
    }
    
    img:nth-of-type(6) {
      animation: infinite;
      animation-duration: 1s;
      animation-name: sixth;
    }
  }
  
  
  
  #flameIcon {
    left: 100px;
    position: relative;
  }
  
  #unicorn {
    position: relative;
    left: 155px;
  }
  
  .modalText {
    position: relative;
    font-size: 32px;
    color: #d4d6db;
    font-weight: 300;
    width: 100%;
    text-align: center;
    top: 130px;
  }
  
`;