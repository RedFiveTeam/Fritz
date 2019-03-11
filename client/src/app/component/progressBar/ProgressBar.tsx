import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UploadStore } from '../form/upload/UploadStore';

interface Props {
  className?: string;
  uploadStore?: UploadStore;
}

@observer
export class ProgressBar extends React.Component<Props> {

  css = {
    width: '0%',
  };

  componentDidMount() {
    let interval = setInterval(
      () => {
        let percent = this.props.uploadStore!.PercentConverted;
        let status = this.props.uploadStore!.processing;
        let ele = document.getElementById('progressBar') as HTMLElement;
        if (ele) {
          ele.style.width = percent + '%';
          ele.setAttribute('aria-valuenow', percent.toString());
        }
        if (status === false || !ele) {
          clearInterval(interval);
        }
      },
      100);
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          className="progress shadow"
        >
          <div
            id="progressBar"
            className="progress-bar bg-info"
            role="progressbar"
            style={this.css}
            aria-valuenow={0}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div
          id="status"
        >
          {this.props.uploadStore!.progress}/{this.props.uploadStore!.total} Images Converted
        </div>
      </div>
    );
  }
}

export const StyledProgressBar = inject('uploadStore')(styled(ProgressBar)`
left: 100px;
position: absolute;
top: 277px;
width: 600px;

 #status {
  color: #FFF;
  width: 100%;
  text-align: center;
  }
`);