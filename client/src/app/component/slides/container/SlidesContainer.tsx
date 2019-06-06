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
            .map((s, idx) => {
              if (s.deleted) {
                this.count++;
              }
              return (
                <div className="slideCardContainer" key={idx}>
                  {
                    !s.deleted &&
                    <StyledSlideCard
                        slideModel={s}
                        slideNumber={idx}
                        deletedCount={this.count}
                        thumbnailClick={this.props.carouselActions!.show}
                        first={idx === 0}
                    />
                  }
                  {
                    s.deleted &&
                    <StyledUndoDeleteContainer
                        slideModel={s}
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
  margin-left: 32px;
  white-space: nowrap;
`);