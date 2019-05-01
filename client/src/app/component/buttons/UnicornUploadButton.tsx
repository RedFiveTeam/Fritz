import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UnicornStore } from '../unicorn/store/UnicornStore';

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
}

@observer
export class UnicornUploadButton extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <button
          className="uploadBtn"
          onClick={() => {
            this.props.unicornStore!.setPendingUpload(true);
            this.props.unicornStore!.setConfirmUploadStatus(true);
          }}
          disabled={this.props.slidesStore!.differentAsset}
        >
          Upload To UNICORN
        </button>
      </div>
    );
  }
}

export const StyledUnicornUploadButton = inject('unicornStore')
(styled(UnicornUploadButton)`
  
  button {
    outline: none;
    width: 170px;
    height: 38px;
    border-radius: 4px;
    border: solid 1px #0275d8;
    background-color: #00818C;
    font-size: 16px;
    color: #FFF;
    cursor: pointer;
    transition: background-color 250ms;
    
    :hover {
      background-color: #3BB7C1;
    }
  }
  
  button:disabled,
  button[disabled] {
    background-color: #303b3c;
    color: #676767;
    border: none;
    cursor: not-allowed;
  }
`);