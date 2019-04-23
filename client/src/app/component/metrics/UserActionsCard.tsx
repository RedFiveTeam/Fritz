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
  async componentWillMount() {
    await this.props.metricActions!.initializeStores();
  }

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
          <div className="totalUploads">
            <div className="totalUploadCount">
              {this.props.metricStore!.totalUploads}
            </div>
            <div >PDF Files Uploaded</div>
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

.cardContent {
  display: inline-block;
  position: relative;
  bottom: 20px;
}

.userActionsIcon > div > div {
  margin-top: 16px;
  color: #D4D6DB;
  font-size: 36px;
  width: 100px;
}

 .totalUploads {
  position: relative;
  margin-left: 66px;
  text-align: center;
  display: inline-block;
}

.totalUploadCount {
    font-weight: normal;
}

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
`);