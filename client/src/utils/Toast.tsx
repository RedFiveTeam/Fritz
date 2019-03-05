import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

@observer
export class Toast extends React.Component<Props> {

  static count: number = 0;

  static showUploadError = () => {
    let ele = document.querySelector('.customToast') as HTMLElement;
    let count = Toast.count;
    Toast.count++;
    ele.insertAdjacentHTML('beforeend', '' +
      '<div class="alert alert-danger errorToast errorToast' + count + '" role="alert">' +
      '<b>Error:</b> File must be in Powerpoint format (<b>.ppt</b> or <b>.pptx</b>)' +
      '</div>' +
      '');
    setTimeout(
      () => {
        (document.querySelector('.errorToast' + count) as HTMLElement).style.opacity = '1';
      },
      1);
    setTimeout(
      () => {
        (document.querySelector('.customToast > .errorToast' + count) as HTMLElement).style.opacity = '0';
        setTimeout(
          () => {
            let toast = document.querySelector('.customToast > .errorToast' + count) as HTMLElement;
            ele.removeChild(toast);
          },
          1000);
      },
      4000);
  };

  static showDownloadError = () => {
    let ele = document.querySelector('.customToast') as HTMLElement;
    let count = Toast.count;
    Toast.count++;
    ele.insertAdjacentHTML('beforeend', '' +
      '<div class="alert alert-danger errorToast errorToast' + count + '" role="alert">' +
      '<b>Error:</b> You must upload a Powerpoint file before you can download JPEGS' +
      '</div>' +
      '');
    setTimeout(
      () => {
        (document.querySelector('.errorToast' + count) as HTMLElement).style.opacity = '1';
      },
      1);
    setTimeout(
      () => {
        (document.querySelector('.customToast > .errorToast' + count) as HTMLElement).style.opacity = '0';
        setTimeout(
          () => {
            let toast = document.querySelector('.customToast > .errorToast' + count) as HTMLElement;
            ele.removeChild(toast);
          },
          1000);
      },
      4000);
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
  top: 52px;
  left: 50%;
  transform: translate(-50%, 0%);
  display: block;
  z-index: 5;
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
`;