import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UnicornStore } from '../store/UnicornStore';
import { MissionModel } from '../model/MissionModel';
import { UnicornActions } from '../actions/UnicornActions';

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
  unicornActions?: UnicornActions;
  mission: MissionModel;
}

@observer
export class Mission extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className + ' missionRow ' + this.props.mission.id}
        onClick={async () => {
          this.props.unicornStore!.setActiveMission(this.props.mission);
          if (navigator.userAgent.toLowerCase().indexOf('electron') === -1) {
            await this.props.unicornActions!.getCallouts(this.props.mission.id);
          }
        }}
      >
        <div className="content">
          <span className="callsign">{this.props.mission.callsign}</span>
          <span className="startTime">{this.props.mission.startTime.substring(0, 10)}</span>
          <span
            className="selectText"
          >
          Select
          </span>
        </div>
      </div>
    );
  }
}

export const StyledMission = inject('unicornStore', 'unicornActions')(styled(Mission)`
width: 100%;
transition: background-color 200ms;

:hover {
  background-color: #1F1F2C;
}

.content {
  cursor: pointer;
  margin: auto;
  width: 807px;
  height: 66px;
  line-height: 66px;
  font-size: 24px;
  color: #fff;
  border-bottom: 1px solid #1f1f2c;
}

.selectText {
  position: absolute;
  font-size: 16px;
  color: #15deec;
  right: 0px;
  margin-right: 31px;
}

span:first-of-type {
  display: inline-block;
  white-space: nowrap;
  margin-left: 5px;
  width: 70px;
  overflow: visible;
}

span:nth-of-type(2) {
  margin-left: 125px;
}

`);