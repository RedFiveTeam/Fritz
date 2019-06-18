import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

@observer
export class Toast extends React.Component<Props> {

  static count: number = 0;

  static create = (duration: number, className: string, content: string) => {
    let ele = document.querySelector('.customToast') as HTMLElement;
    let count = Toast.count;
    Toast.count++;
    if (ele) {
      ele.insertAdjacentHTML(
        'beforeend',
        '<div class="alert alert-danger ' + className + ' ' + className + count + '" role="alert">' +
        content +
        '</div>'
      );
    }
    setTimeout(
      () => {
        (document.querySelector('.' + className + count) as HTMLElement).style.opacity = '1';
      },
      1);
    setTimeout(
      () => {
        (document.querySelector('.customToast > ' + '.' + className + count) as HTMLElement).style.opacity = '0';
        setTimeout(
          () => {
            let toast = document.querySelector('.customToast > ' + '.' + className + count) as HTMLElement;
            ele.removeChild(toast);
          },
          1000);
      },
      duration - 1000);
  };

  render() {
    return (
      <div
        className={this.props.className + ' customToast'}
      />
    );
  }
}

export const StyledToast = styled(Toast)`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translate(-50%, 0%);
  display: block;
  z-index: 1000;
  width: 50%;
  height: auto;
  max-height: 800px;
  transition: max-height 1s;
  
  .errorToast {
    margin: auto;
    opacity: 0;
    text-align: center;
    border: none;
    color: #d4d6db;
    background-color: #ae4754;
    width: 95%;
    margin-bottom: 10px;
    box-shadow: 4px 4px 6px rgba(0,0,0,0.5);
    transition: opacity 1s;
  }
  .deleteToast{
    margin: auto;
    opacity: 0;
    text-align: center;
    border: none;
    color: #FFF;
    background-color: #1F1F2C;
    width: 70%;
    margin-bottom: 10px;
    box-shadow: 4px 4px 6px rgba(0,0,0,0.5);
    transition: opacity 1s;
  }
`;