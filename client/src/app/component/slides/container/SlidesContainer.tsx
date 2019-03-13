import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SlidesStore } from '../SlidesStore';
import styled from 'styled-components';
import { SlideModel } from '../SlideModel';
import { StyledSlideCard } from '../slideCard/SlideCard';

interface Props {
  className?: string;
  slidesStore?: SlidesStore;
}

@observer
export class SlidesContainer extends React.Component<Props> {

  getSlideName = (s: SlideModel, idx: number) => {
    return (
      <div key={idx} className="slide">
        {
          ((this.props.slidesStore!.date && this.props.slidesStore!.date!.substr(0, 2)) || 'DD')
        }
        {s.time.indexOf('TTTT') > -1 ? <span className="text-info font-italic">TTTT</span> : s.time}
        {
          (((this.props.slidesStore!.date && this.props.slidesStore!.date!.substr(6, 6)) || 'ZMONYY') + '_' +
            (this.props.slidesStore!.opName || 'TGT_NAME') + '_')
            .split(' ').join('_').toUpperCase()
        }
        {s.activity.indexOf('ACTY') > -1 ? <span className="text-info font-italic">ACTY</span> : s.activity}
        {('_' + (this.props.slidesStore!.asset || 'ASSET') + '_' +
          (this.props.slidesStore!.classification || 'CLASSIFICATION'))
          .split(' ').join('_').toUpperCase()
        }
      </div>
    );
  };

  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.props.slidesStore!.slides.map((s, idx) => {
            return (
              <div key={idx}>
                <StyledSlideCard
                  slideName={this.getSlideName(s, idx)}
                  slideNumber={idx}
                  slideModel={s}
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