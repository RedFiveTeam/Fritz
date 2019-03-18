import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SlidesStore } from '../SlidesStore';
import styled from 'styled-components';
import { StyledSlideCard } from '../slideCard/SlideCard';

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
        {
          this.props.slidesStore!.slides.map((s, idx) => {
            return (
              <div className="slideCardContainer" key={idx}>
                <StyledSlideCard
                  slideModel={s}
                  slideNumber={idx}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}

export const StyledSlidesContainer = inject('slidesStore')(styled(SlidesContainer)`
max-width: 755px;
color: white;
margin-left: 47px;
`);