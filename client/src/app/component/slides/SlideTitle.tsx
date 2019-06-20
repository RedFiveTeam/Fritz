import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { SlideModel } from './models/SlideModel';

interface Props {
  slide: SlideModel;
  opName: string | null;
  asset: string | null;
  releasability: string | null;
  className?: string;
}

@observer
export class SlideTitle extends React.Component<Props> {

  render() {
    return (
      <div
        className={this.props.className + ' slideTitle'}
      >
        {this.displayDateTimeOrPlaceholder()}
        _
        {this.displayOpNameOrPlaceholder()}
        _
        {this.displayActivityOrPlaceholder()}
        _
        {this.displayAssetOrPlaceholder()}
        _
        {this.displayReleasabilityOrPlaceholder()}
      </div>
    );
  }

  private displayReleasabilityOrPlaceholder(): string {
    return this.generatePlaceholder(this.props.releasability, 'RELEASABILITY');
  }

  private displayAssetOrPlaceholder(): string {
    return this.generatePlaceholder(this.props.asset, 'ASSET');
  }

  private displayDateTimeOrPlaceholder() {
    return (
      <span>
        {this.props.slide.dayWithLeadingZero}
        <span className={(this.props.slide.time ? '' : 'blue-text-time')}>
          {this.generatePlaceholder(this.props.slide.time, 'TTTT')}
        </span>
        <span>Z</span>
        {this.props.slide.monthThreeLetter.toUpperCase()}
        {this.props.slide.yearTwoDigit}
      </span>
    );
  }

  private displayActivityOrPlaceholder() {
    return (
      <span className={(this.props.slide.activity ? '' : 'blue-text-activity')}>
        {this.generatePlaceholder(this.props.slide.activity, 'ACTY')}
      </span>
    );
  }

  private displayOpNameOrPlaceholder(): string {
    return this.generatePlaceholder(this.props.opName, 'TGT_NAME');
  }

  private generatePlaceholder(value: string | null, placeholder: string) {
    return (value || placeholder).split(' ').join('_').toUpperCase();
  }
}

export const StyledSlideName = styled(SlideTitle)`
  width: 430px;
  font-size: 14px;
  position: relative;
  font-weight: bold;
  white-space: pre-wrap;
  
  .blue-text-time {
    color: #15DEEC;
    font-style: italic;
  }
  
  .blue-text-activity {
    color: #15DEEC;
    font-style: italic;
  }
  
`;