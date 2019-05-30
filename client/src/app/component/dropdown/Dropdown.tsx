import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import * as ReactDOM from 'react-dom';

const DropdownIcon = require('../../../icon/DropdownIcon.svg');

interface Props {
  className?: string;
  options: string[];
  defaultValue: string;
  value: string | null;
  callback: (s: any) => void;
  id?: string;
}

@observer
export class Dropdown extends React.Component<Props> {

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick = (e: any) => {
    let dd = document.querySelectorAll('.dd');
    for (let i = 0; i < dd.length; i++) {
      if ((dd[i] as HTMLElement).parentNode!.firstChild !== e.target
      ) {
        (dd[i] as HTMLElement).style.display = 'none';
      }
    }
  };

  renderText = () => {
    if (this.props.value !== '' && this.props.value !== null) {
      return <span className="default">{this.props.value}</span>;
    }
    return <span className="default">{this.props.defaultValue}</span>;
  };

  optionSelect = (e: any) => {
    let component = (ReactDOM.findDOMNode(this) as HTMLElement);
    let dd = component.querySelector('.dd') as HTMLElement;
    if (dd) {
      dd.style.display = 'none';
    }
    (e.target as HTMLElement).classList.add('selected');
    let options = component.querySelectorAll('.ddd');
    for (let i = 0; i < options.length; i++) {
      if (options[i] !== e.target) {
        (options[i] as HTMLElement).classList.remove('selected');
      }
    }
    this.props.callback(e.target.dataset.option);
  };

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
            (component.querySelector('.dd') as HTMLElement).style.display = 'block';
          }}
          id={this.props.id ? this.props.id : ''}
        >
          {this.renderText()}
        </button>
        <img src={DropdownIcon}/>
        <div className="dd">
          {
            this.props.options.map((o: any, idx) => {
              return (
                <div
                  onClick={this.optionSelect}
                  className="ddd"
                  data-option={o}
                  key={idx}
                >
                  {o}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export const StyledDropdown = (styled(Dropdown)`
  display: inline-block;
  position: relative;
  width: 117px;
  height: 44px;
  background-color: #151524;
  border-radius: 4px;
  cursor: pointer;
  
  .dropdownBtn {
    cursor: pointer;
    height: 46px;
    margin: auto;
    line-height: 44px;
    white-space: nowrap;
    vertical-align: middle;
    position: absolute;
    top: -2px;
    left: -20px;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0);
    outline: none;
    border: none;
    color: #fff;
    width: 100%;
    font-size: 20px;
    font-weight: bold;
  }
  
  .dd {
    position: absolute;
    display: none;
    text-align: center;
    width: 141px;
    height: auto;
    left: -24px;
    top: 47px;
    border-radius: 4px;
    background: #151524;
    z-index: 125;
    font-weight: 300;
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