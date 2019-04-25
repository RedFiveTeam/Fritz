import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { MetricActions } from './actions/MetricActions';
import { MetricStore } from './MetricStore';

const ActionTimesIcon = require('../../../icon/ActionTimesIcon.svg');

interface Props {
  className?: string;
  metricStore?: MetricStore;
  metricActions?: MetricActions;
}

@observer
export class ActionsTimeCard extends React.Component<Props> {
  async componentWillMount() {
    await this.props.metricActions!.initializeStores();
  }

  calculateAverage(flow: string) {
    let value: number = this.props.metricActions!.calculateAverageDifference(flow);
    return (
      <span className={value > 0 ? 'red' : 'green'}>
        {
        '(' +  (value === 0 || Number.isNaN(value) ? '' : (value > -1 ? '+' : '')) + value + ' Seconds)'
        }
      </span>
    );
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="actionTimesIcon">
          <div className="leftTab">
            <img src={ActionTimesIcon}/>
            <div>Action Times</div>
          </div>
        </div>
        <div className="cardContent">
          <div className="averageTime">
            <div>
              {
                this.props.metricStore!.averages.workflow.length > 0 &&
                this.props.metricActions!.calculateAverage(
                  'workflow',
                  this.props.metricStore!.filterValue
                ) + 's'
              }
            </div>
            <div>Avg. Workflow Time</div>
            <div className="difference">
              {
                this.props.metricStore!.averages.workflow.length > 0 &&
                this.calculateAverage('workflow')
              }
            </div>
          </div>
          <div className="averageUpload">
            <div>
              {
                this.props.metricStore!.averages.upload.length > 0 &&
                this.props.metricActions!.calculateAverage(
                  'upload',
                  this.props.metricStore!.filterValue
                ) + 's'
              }
            </div>
            <div>Avg. Upload Time</div>
            <div className="difference">
              {
                this.props.metricStore!.averages.upload.length > 0 &&
                this.calculateAverage('upload')
              }
            </div>
          </div>
          <div className="averageRename">
            <div>
              {
                this.props.metricStore!.averages.rename.length > 0 &&
                this.props.metricActions!.calculateAverage(
                  'rename',
                  this.props.metricStore!.filterValue
                ) + 's'}
            </div>
            <div>Avg. Rename Time</div>
            <div className="difference">
              {
                this.props.metricStore!.averages.rename.length > 0 &&
                this.calculateAverage('rename')
              }
            </div>
          </div>
          <div className="averageDownload">
            <div>
              {
                this.props.metricStore!.averages.download.length > 0 &&
                this.props.metricActions!.calculateAverage(
                  'download',
                  this.props.metricStore!.filterValue
                ) + 's'}
            </div>
            <div>Avg. Download Time</div>
            <div className="difference">
              {
                this.props.metricStore!.averages.download.length > 0 &&
                this.calculateAverage('download')
              }
            </div>
          </div>
          <div className="averageConversion">
            <div>
              {
                this.props.metricStore!.averages.conversion.length > 0 &&
                this.props.metricActions!.calculateAverage(
                  'conversion',
                  this.props.metricStore!.filterValue
                ) + 's'}
            </div>
            <div>Avg. Conversion Time</div>
            <div className="difference">
              {
                this.props.metricStore!.averages.conversion.length > 0 &&
                this.calculateAverage('conversion')
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledActionsTimeCard = inject('metricActions', 'metricStore')(styled(ActionsTimeCard)`
position: relative;
margin: auto;
width: 1363px;
height: 263px;
overflow: hidden;
margin-top: 80px;
background-color: #2B303C;
box-shadow: 5px 5px 9px rgba(0, 0, 0, 0.5);

.actionTimesIcon {
  display: inline-block;
  position: relative;
  width: 218px;
  margin-left: 27px;
  height: 224px;
  border-right: solid 1px #818A91;
  margin-top: 20px;
}

.leftTab {
  margin-top: 13px;
}

.cardContent {
  display: inline-block;
  position: relative;
  bottom: 20px;
}

.green {
  color: green;
}

.red {
  color: red;
}

.actionTimesIcon > div > div {
  margin-top: 16px;
  color: #D4D6DB;
  font-size: 36px;
  width: 100px;
}

.averageTime, .averageUpload, .averageRename, .averageDownload, .averageConversion {
  position: relative;
  margin-left: 55px;
  text-align: center;
  display: inline-block;
  
  div:first-of-type {
    font-size: 60px;
    color: #fff;
  }
  
  div:nth-of-type(2) {
    font-size: 24px;
    color: #6c7f9c;
    width: 161px;
    font-weight: 100;
  }
}

.difference {
  font-size: 14px;
}
`);