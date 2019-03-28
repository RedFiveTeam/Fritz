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
            <div>{this.props.metricActions!.calculateWorkflowAverage(this.props.metricStore!.metrics) + 's'}</div>
            <div>Avg. Workflow Time</div>
          </div>
          <div className="averageUpload">
            <div>{this.props.metricActions!.calculateUploadAverage(this.props.metricStore!.metrics) + 's'}</div>
            <div>Avg. Upload Time</div>
          </div>
          <div className="averageRename">
            <div>{this.props.metricActions!.calculateRenameAverage(this.props.metricStore!.metrics) + 's'}</div>
            <div>Avg. Rename Time</div>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledActionsTimeCard = inject('metricActions', 'metricStore')(styled(ActionsTimeCard)`

position: relative;
margin: auto;
width: 1286px;
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

.actionTimesIcon > div > div {
  margin-top: 16px;
  color: #D4D6DB;
  font-size: 36px;
  width: 100px;
}

.averageTime, .averageUpload, .averageRename {
  position: relative;
  margin-left: 66px;
  text-align: center;
  display: inline-block;
  
  div:first-of-type {
    font-size: 60px;
    color: #fff;
  }
  
  div:last-of-type {
    font-size: 24px;
    color: #D4D6DB;
    width: 161px;
  }
}

`);