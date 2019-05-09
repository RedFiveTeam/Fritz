import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UnicornStore } from '../store/UnicornStore';
import { SlidesStore } from '../../slides/store/SlidesStore';

interface Props {
  className?: string;
  slidesStore?: SlidesStore;
  unicornStore?: UnicornStore;
}

@observer
export class UnicornUploadProgress extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <span>{this.props.unicornStore!.currentUploadCount}</span> of&nbsp;
        <span>{this.props.slidesStore!.assignedCalloutCount}</span> images uploaded
      </div>
    );
  }
}

export const StyledUnicornUploadProgress = inject('slidesStore', 'unicornStore')(styled(UnicornUploadProgress)`
  color: #fff;
  font-style: italic;
  letter-spacing: 0.4px;

  span {
    color: #15DEEC;
  }
`);