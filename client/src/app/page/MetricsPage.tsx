import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledMetricsTable } from '../component/metrics/table/MetricsTable';
import { MetricActions } from '../component/metrics/actions/MetricActions';
import { StyledClassificationBanner } from '../component/classification/ClassificationBanner';
import { ClassificationStore } from '../component/classification/store/ClassificationStore';
import { ClassificationActions } from '../component/classification/ClassificationActions';
import { StyledActionsTimeCard } from '../component/metrics/ActionsTimeCard';

interface Props {
  className?: string;
  metricActions?: MetricActions;
  classificationStore?: ClassificationStore;
  classificationActions?: ClassificationActions;
}

@observer
export class MetricsPage extends React.Component<Props> {
  async componentDidMount() {
    await this.props.classificationActions!.initializeStore();
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledClassificationBanner
          classification={this.props.classificationStore!.classification}
        />
        <nav
          className="nav navbar-default"
        >
          <div
            id="bannerTitle"
          >
            Metrics
          </div>
          <div className="secondary-text">
            <button
              className="exportMetrics"
              onClick={() => this.props.metricActions!.exportMetrics()}
            >
              Export as .CSV
            </button>
          </div>
        </nav>
        <StyledActionsTimeCard/>
        <StyledMetricsTable/>
      </div>
    );
  }
}

export const StyledMetricsPage = inject(
  'metricActions',
  'classificationStore',
  'classificationActions')
(styled(MetricsPage)`

height: 100vh;
  #bannerTitle {
    width: 200px;
    margin: 16px 16px 16px 33px;
    display: inline-block;
  }
  
  .secondary-text {
    float: right;
    width: 155px;
    line-height: 70px;
  }
  
  button {
    font-size: 18px;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
    color: #15DEEC;
  }
  
  nav {
    position: relative;
    top: 26px;
    display: inline-block;
    width: 100%;
    font-size: 34px;
    color: #fff;
    background: #363E4A;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
`);