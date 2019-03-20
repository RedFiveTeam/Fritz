import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const UploadingIcon = require('../../../../icon/UploadingIcon.svg');

interface Props {
  className?: string;
}

@observer
export class UploadProgressContainer extends React.Component<Props> {

  interval: any;

  componentDidMount() {
    this.interval = setInterval(() => {
      let span = document.querySelector('.uploadingText > span') as HTMLElement;
      if (span) {
        let dots = span.innerText;
        if (dots.split('.').length - 1 === 3) {
          span.innerText = '.';
        } else {
          span.innerText += '.';
        }
      }
    },                          500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <img src={UploadingIcon} />
        <div className="uploadingText">
          Please give us a moment while we upload your powerpoint
          <span>...</span>
        </div>
      </div>
    );
  }
}

export const StyledUploadProgressContainer = styled(UploadProgressContainer)`
  width: 400px;
  margin: auto;
  margin-top: 79px;
  text-align: center;
  
  .uploadingText {
    position: relative;
    margin-top: 48px;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: #5C6A7F;
    width: 406px;
  }
  
  span {
    position: absolute;
  }
`;