import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SlidesStore } from './SlidesStore';
import styled from 'styled-components';

interface Props {
  className?: string;
  slidesStore?: SlidesStore;
}

@observer
export class SlidesContainer extends React.Component<Props> {

  render() {
    return (
      <div
        className={this.props.className}
      >
        {this.props.slidesStore!.slides.map((s, idx) => {
          return <div key={idx} className="slide">{s.newName}</div>;
        })
        }
      </div>
    );
  }
}

export const StyledSlidesContainer = inject('slidesStore')(styled(SlidesContainer)`
color: white;
margin-left: 47px;
max-height: 560px;
overflow-y: auto;
`);