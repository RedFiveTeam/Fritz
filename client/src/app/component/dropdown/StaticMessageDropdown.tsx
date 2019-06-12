import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import * as ReactDOM from 'react-dom';

const DropdownIcon = require('../../../icon/DropdownIcon.svg');

interface Props {
  label: string;
  message: string;
  className?: string;
}

@observer
export class StaticMessageDropdown extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className + ' dropdown'}
      >
        <button
          className="dropdownBtn"
          onClick={(e: any) => {
            let component = (ReactDOM.findDOMNode(this) as HTMLElement);
            e.preventDefault();
            let parent = component.parentElement!.parentElement!.parentElement;
            if (parent && parent.classList.contains('slideCardContainer')) {
              let options = component.querySelector('.dd') as HTMLElement;
              if (window.innerHeight - parent.getBoundingClientRect().bottom < 175) {
                options.style.top = '-189px';
              } else {
                options.style.top = '47px';
              }
            }
            (
              ((component.querySelector('.dd') as HTMLElement).style.display === 'none' ||
                (component.querySelector('.dd') as HTMLElement).style.display === ''
                ? (component.querySelector('.dd') as HTMLElement).style.display = 'block'
                : (component.querySelector('.dd') as HTMLElement).style.display = 'none'
          ));
          }}
        >
          <span className="default">
            {this.props.label}
          </span>
        </button>
        <img src={DropdownIcon}/>
        <div className="dd">
          <span>{this.props.message}</span>
        </div>
      </div>
    );
  }
}

export const StyledStaticMessageDropdown = (styled(StaticMessageDropdown)`
  display: inline-block;
  position: relative;
  width: 125px;
  height: 44px;
  background-color: #151524;
  border-radius: 4px;
  cursor: pointer;
  
  span {
   margin-right: 10px;
  }
  
  .dropdownBtn {
    cursor: pointer;
    height: 40px;
    margin: auto;
    line-height: 44px;
    white-space: nowrap;
    vertical-align: middle;
    position: absolute;
    top: 0;
    width: 125px;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0);
    outline: none;
    border: none;
    color: #15DEEC;
    font-size: 20px;
    font-weight: bold;
    z-index: 2;
  }
  
  .dd {
    position: absolute;
    display: none;
    text-align: center;
    justify-content: center;
    white-space: normal;
    width: 125px;
    height: 154px;
    top: 47px;
    border-radius: 4px;
    background: #151524;
    z-index: 125;
    font-weight: 300;
    font-size: 16px;
    font-style: italic;
    letter-spacing: 0.6px;
    color: #6c7f9c;
    
    span {
      display: block;
      position: relative;
      margin-top: 3px;
    }
  }
  
  .ddd {
    cursor: pointer;
    width: 100%;
    transition: background-color 0.5s ease;
    font-size: 20px;
    line-height: 36px;
    vertical-align: middle;
    height: 36px;
    color: #fff;
    letter-spacing: 0.7px;
    padding-left: 2px;
        
    :hover {
      background-color: #2b303c;
    }
  }
  
  span {
    pointer-events: none;
  }
  
  .selected {
    background-color: #5689F3;
   }
   
  img {
    pointer-events: none;
    position: absolute;
    right: 8px;
    top: 16px;
  }
`);