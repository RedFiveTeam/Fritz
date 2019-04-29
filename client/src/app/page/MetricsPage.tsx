import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledMetricsTable } from '../component/metrics/table/MetricsTable';
import { MetricActions } from '../component/metrics/actions/MetricActions';
import { StyledActionsTimeCard } from '../component/metrics/ActionsTimeCard';
import { MetricStore } from '../component/metrics/MetricStore';
import { ClockIcon } from '../../icon/ClockIcon';
import { StyledUserActionsCard } from '../component/metrics/UserActionsCard';

interface Props {
  className?: string;
  metricActions?: MetricActions;
  metricStore?: MetricStore;

}

@observer
export class MetricsPage extends React.Component<Props> {

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
        <nav
          className="nav navbar-default"
        >
          <div id="bannerTitle">
            <a>
              Metrics
            </a>
          </div>
          <div
            className="btn-group"
            role="group"
            aria-label="..."
          >
            <button
              id="dashBoardButton"
              type="button"
              className="btn btn-default text-white shadow"
              onClick={() => this.handleToggle('tab1', 'tab2', 'dashBoardButton', 'activityLogButton')}
            >
              Dashboard
            </button>
            <button
              id="activityLogButton"
              type="button"
              className="btn text-white shadow"
              onClick={() => this.handleToggle('tab2', 'tab1', 'activityLogButton', 'dashBoardButton')}
            >
              Activity Log
            </button>
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
          <div className="parentExportMetrics">
            <button
              className="exportMetrics"
              onClick={() => this.props.metricActions!.exportMetrics()}
            >
              Export as .CSV
            </button>
          </div>
        </nav>
        <div id="tab1">
          <StyledActionsTimeCard/>
          <StyledUserActionsCard/>
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

height: 90vh;
top: -12px;
position: relative;

  #bannerTitle {
    width: 200px;
    //margin: 16px 16px 16px 33px;
    display: inline-block;
  }
  
  a {
  line-height: 1.8;
  margin-left: 28px;
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
    display: inline-block;
    width: 100%;
    font-size: 34px;
    color: #fff;
    background: #363E4A;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    height: 63px;
  }
  
  .secondary-text {
    font-size: 20px;
    display: inline-block;
    right: 0;
    color: #93A7C3;
    margin-right: 20px;
    width: 300px;
    margin: 17px;
    float: right;
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
    display: inline-block;
    height: 50px;
    vertical-align: top;
    left: 50%;
    position: absolute;
    transform: translate(-50%, 0);
  }

  #dashBoardButton {
  background: #0E5F66;
  }
  
  #activityLogButton {
  background: #00818C;
  }
  
  .exportMetrics {
  right: 21px;
  top: 72px;
  position: absolute;
  
  }
 
  #tab2 {
  display: none;
  height: 100%;
  }
  
  #tab1 {
  margin-top: 100px;
  }
  
  #activityLogButton {
  border-radius: 0 4px 4px 0;
  }
  
  #dashBoardButton {
  border-radius: 4px 0 0 4px;
  }
`);