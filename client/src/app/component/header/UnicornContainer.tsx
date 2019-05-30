import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { SlidesStore } from '../slides/store/SlidesStore';
import { badCallsignCSS, goodCSS } from '../../../themes/default';
import { UnicornActions } from '../unicorn/actions/UnicornActions';

const refreshIcon = require('../../../icon/RefreshIcon.svg');

interface Props {
  unicornActions?: UnicornActions;
  unicornStore?: UnicornStore;
  slidesStore?: SlidesStore;
  className?: string;
}

@observer
export class UnicornContainer extends React.Component<Props> {
  displayMissionInfo() {
    let {unicornActions, unicornStore, slidesStore} = this.props;

    return (
      <div>
        <div
          className={'refreshContainer'}
          onClick={unicornActions!.refreshCallouts}
        >
          <img
            alt={''}
            src={refreshIcon}
            className={
              unicornStore!.isRefreshing
                ? 'rotating'
                : 'stationary'
            }
          />
          <span
            className="refreshCallouts"
          >
            Refresh Callouts
          </span>
        </div>
        <div
          className={'missionContainer'}
          onClick={unicornActions!.resetActiveMission}
          style={
            slidesStore!.differentAsset
              ? badCallsignCSS
              : goodCSS
          }
        >
          <span>
            {
              `Mission: ` +
              (
                unicornStore!.activeMission
                  ? unicornStore!.activeMission.callsign
                  : 'None Selected'
              )
            }
          </span>
          <span
            className="changeMissionBtn"
          >
          Change
          </span>
        </div>
      </div>
    );
  }

  displayOfflineStatus() {
    return <div>UNICORN is offline</div>;
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.props.unicornStore!.offline
            ? this.displayOfflineStatus()
            : this.displayMissionInfo()
        }
      </div>
    );
  }
}

export const StyledUnicornContainer = inject(
  'unicornActions',
  'unicornStore',
  'slidesStore'
)(styled(UnicornContainer)`
  display: flex;
  flex-direction: row;

  div {
    color: #fff;
    display: flex;
    margin: auto;
    margin-right: 27px;
  }

  .refreshContainer {
    cursor: pointer;
    color: #15deec;
    margin-right: 16px;
    font-weight: bold;
    
    span {
      margin-left: 13px;
    }
  }
  
  .missionContainer {
    margin: auto;
    cursor: pointer;
    color: #fff; 
    
    .changeMissionBtn {
      color: #15deec;
      margin-left: 13px;
    }
  } 
  
  @keyframes rotating {
    from {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    to {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  }

  .rotating {
    -webkit-animation: rotating .5s linear infinite;
    -moz-animation: rotating .5s linear infinite;
    -ms-animation: rotating .5s linear infinite;
    -o-animation: rotating .5s linear infinite;
    animation: rotating .5s linear infinite;
  }
`);