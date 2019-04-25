import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { MetricStore } from './MetricStore';
import { MetricActions } from './actions/MetricActions';

const UserActionsIcon = require('../../../icon/UserActionsIcon.svg');

interface Props {
  className?: string;
  metricStore?: MetricStore;
  metricActions?: MetricActions;
}

@observer
export class UserActionsCard extends React.Component<Props> {

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="userActionsIcon">
          <div className="leftTab">
            <img src={UserActionsIcon}/>
            <div>User Actions</div>
          </div>
        </div>
        <div className="cardContent">
          <div className="totalConverted">
            <div className="totalConvertedCount">
              {this.props.metricActions!.countConverted(this.props.metricStore!.filteredMetrics)}
            </div>
            <div >Slides Converted</div>
          </div>
          <div className="totalDownloads">
            <div className="totalDownloadCount">
              {this.props.metricActions!.countDownloads(this.props.metricStore!.filteredMetrics)}
            </div>
            <div >Zip Files Downloaded</div>
          </div>
          <div className="totalUploads">
            <div className="totalUploadCount">
              {this.props.metricActions!.countUploads(this.props.metricStore!.filteredMetrics)}
            </div>
            <div >PDF Files Uploaded</div>
          </div>
          <div className="totalDeletes">
            <div className="totalDeleteCount">
              {this.props.metricActions!.countDeletes(this.props.metricStore!.filteredMetrics)}
            </div>
            <div >JPEGs Deleted</div>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledUserActionsCard = inject('metricActions', 'metricStore')(styled(UserActionsCard)`
position: relative;
margin: auto;
width: 1286px;
height: 263px;
overflow: hidden;
margin-top: 80px;
background-color: #2B303C;
box-shadow: 5px 5px 9px rgba(0, 0, 0, 0.5);

.userActionsIcon {
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

.totalDeletes {
  bottom: 35px;
}

.cardContent {
  display: inline-block;
  position: relative;
  bottom: 38px;
}

.userActionsIcon > div > div {
  margin-top: 16px;
  color: #D4D6DB;
  font-size: 36px;
  width: 100px;
}

 .cardContent > div {
  position: relative;
  margin-left: 66px;
  text-align: center;
  display: inline-block;
  
  > div:first-of-type {
    font-weight: normal;
  }
  
  > div:last-of-type {
    width: 161px;
  }
}

  div:first-of-type {
    font-size: 60px;
    color: #fff;
  }
  
  div:nth-of-type(2) {
    font-size: 24px;
    color: #6c7f9c;
    font-weight: 100;
  }
`);