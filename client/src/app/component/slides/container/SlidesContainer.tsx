import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SlidesStore } from '../store/SlidesStore';
import styled from 'styled-components';
import { StyledSlideCard } from '../slideCard/SlideCard';
import { StyledUndoDeleteContainer } from '../../UndoDelete/UndoDeleteContainer';
import { CarouselActions } from '../../carousel/CarouselActions';

interface Props {
  carouselActions?: CarouselActions;
  slidesStore?: SlidesStore;
  className?: string;
}

@observer
export class SlidesContainer extends React.Component<Props> {
  count: number = 0;

  componentWillUpdate() {
    this.count = 0;
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.props.slidesStore!.slides
            .map((slide, idx) => {
              if (slide.deleted) {
                this.count++;
              }
              return (
                <div className="slideCardContainer" key={idx}>
                  {
                    !slide.deleted &&
                    <StyledSlideCard
                      slide={slide}
                      slideNumber={idx - this.count}
                      thumbnailClick={(index: number) => {
                        this.props.carouselActions!.show(index);
                      }}
                      first={idx === 0}
                    />
                  }
                  {
                    slide.deleted &&
                    <StyledUndoDeleteContainer
                      slideModel={slide}
                    />
                  }
                </div>
              );
            })
        }
      </div>
    );
  }
}

export const StyledSlidesContainer = inject(
  'slidesStore', 'carouselActions'
)(styled(SlidesContainer)`
  max-width: 860px;
  color: white;
  margin-left: 46px;
  margin-right: 40px;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
`);