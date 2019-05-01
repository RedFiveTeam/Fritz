import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UnicornActions } from '../unicorn/actions/UnicornActions';
import { SlidesStore } from '../slides/SlidesStore';
import { SlideModel } from '../slides/SlideModel';

interface Props {
  className?: string;
  unicornActions?: UnicornActions;
  slidesStore?: SlidesStore;
}

@observer
export class UnicornUploadButton extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <button
          onClick={() => {
            this.props.slidesStore!.slides.filter((s: SlideModel) => {
              return s.targetEventId !== '';
            }).map(async (e: any) => {
              await this.props.unicornActions!.buildUploadModel(e);
            });
          }}
          disabled={this.props.slidesStore!.differentAsset}
        >
          Upload To UNICORN
        </button>
      </div>
    );
  }
}

export const StyledUnicornUploadButton = inject('slidesStore', 'unicornActions')(styled(UnicornUploadButton)`
  
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