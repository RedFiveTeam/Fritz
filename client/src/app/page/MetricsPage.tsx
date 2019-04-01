import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledMetricsTable } from '../component/metrics/table/MetricsTable';
import { MetricActions } from '../component/metrics/actions/MetricActions';
import { StyledClassificationBanner } from '../component/classification/ClassificationBanner';
import { ClassificationStore } from '../component/classification/store/ClassificationStore';
import { ClassificationActions } from '../component/classification/ClassificationActions';
import { StyledActionsTimeCard } from '../component/metrics/ActionsTimeCard';
import { MetricStore } from '../component/metrics/MetricStore';
import { ClockIcon } from '../../icon/ClockIcon';

interface Props {
  className?: string;
  metricActions?: MetricActions;
  metricStore?: MetricStore;
  classificationStore?: ClassificationStore;
  classificationActions?: ClassificationActions;
}

@observer
export class MetricsPage extends React.Component<Props> {

  async componentDidMount() {
    await this.props.classificationActions!.initializeStore();
  }

  async sortSelected(e: any) {
    await this.props.metricActions!.filterMetrics(e.target.value);

  }

  handleToggle(active: string, inactive: string, activeButton: string, inactiveButton: string) {
    let activeTab = document.getElementById(active);
    let inactiveTab = document.getElementById(inactive);
    let aButton = document.getElementById(activeButton);
    let iButton = document.getElementById(inactiveButton);
    activeTab!.style.display = 'block';
    inactiveTab!.style.display = 'none';
    aButton!.style.backgroundColor = '#0E5F66';
    iButton!.style.backgroundColor = '#00818C';
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
          <div
            className="btn-group"
            role="group"
            aria-label="..."
          >
            <div
              id="buttons"
              className="shadow"
            >
          <button
            id="dashBoardButton"
            type="button"
            className="btn btn-default text-white"
            onClick={() => this.handleToggle('tab1', 'tab2', 'dashBoardButton', 'activityLogButton')}
          >
            Dashboard
          </button>
          <button
            id="activityLogButton"
            type="button"
            className="btn text-white"
            onClick={() => this.handleToggle('tab2', 'tab1', 'activityLogButton', 'dashBoardButton')}
          >
           Activity Log
          </button>
            </div>
          </div>
          <div className="secondary-text">
            <div className="sortSection">
              <div className="clock">
                <ClockIcon/>
              </div>
              Time Frame:
              <select
                defaultValue="All Time"
                className="sortSelector"
                onChange={async (e) => {
                  await this.sortSelected(e);
                }}
              >
                <option value={9007199254740991}>All Time</option>
                <option value={60 * 60 * 24}>Last 24 Hours</option>
                <option value={60 * 60 * 24 * 3}>Last 72 Hours</option>
                <option value={60 * 60 * 24 * 7}>Last 7 Days</option>
                <option value={60 * 60 * 24 * 30}>Last 30 Days</option>
              </select>
            </div>
          </div>
        </nav>
        <button
          className="exportMetrics"
          onClick={() => this.props.metricActions!.exportMetrics()}
        >
          Export as .CSV
        </button>
        <div id="tab1">
          <StyledActionsTimeCard/>
        </div>
        <div id="tab2">
          <StyledMetricsTable/>
          </div>
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
  
  .secondary-text {
    font-size: 20px;
    display: inline-block;
    position: absolute;
    right: 0;
    margin-top: 24px;
    color: #93A7C3;
    margin-right: 20px;
  }
  
  .clock {
    display: inline-block;
    position: relative;
    right: 10px;
    bottom: 2px;
  }
  
  .sortSelector {
    margin-left: 10px;
  }
  
  .btn:focus {
    outline: none !important;
    box-shadow: none;
  }
  
  .btn-group {
    width: 228px;
    bottom: 8px;
    display: inline-block;
    position: absolute;
    top: 13px;
    left: 50%;
    transform: translate(-50%, 0%);
    text-align: center;
    right: 0;
  }

  #dashBoardButton {
  background: #0E5F66;
  }
  
  #activityLogButton {
  background: #00818C;
  }
 
  #tab2 {
  display: none;
  }
  
  #buttons {
  width: max-content;
  }
  
  #activityLogButton {
  border-radius: 0 4px 4px 0;
  }
  
  #dashBoardButton {
  border-radius: 4px 0 0 4px;
  }
`);