import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledClassificationBanner } from '../classification/ClassificationBanner';
import { ClassificationStore } from '../classification/store/ClassificationStore';
import { ClassificationActions } from '../classification/ClassificationActions';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { CSSProperties } from 'react';
import { SlidesStore } from '../slides/store/SlidesStore';

const Logo = require('../../../icon/FritzLogo.svg');

interface Props {
  className?: string;
  classificationStore?: ClassificationStore;
  classificationActions?: ClassificationActions;
  unicornStore?: UnicornStore;
  slidesStore?: SlidesStore;
}

@observer
export class Header extends React.Component<Props> {
  badCallsignCSS: CSSProperties = {
    border: '1px solid #ae4754',
    borderRadius: '7px'
  };

  goodCSS: CSSProperties = {};

  async componentDidMount() {
    await this.props.classificationActions!.initializeStore();
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="parentClassificationBanner">
          <StyledClassificationBanner
            classification={this.props.classificationStore!.classification}
          />
        </div>
        <div className="parentNavBar">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">
                  <img className="logo" alt="FRiTZ" src={Logo}/>
                </a>
                <div
                  className="missionInfo"
                  style={this.props.slidesStore!.differentAsset ? this.badCallsignCSS : this.goodCSS}
                >
                  <span className="selectedMission">Mission: {
                    this.props.unicornStore!.activeMission ?
                      this.props.unicornStore!.activeMission.callsign : 'None Selected'
                  }
                  </span>
                  <span
                    className="changeMissionBtn"
                    onClick={() => {
                      this.props.unicornStore!.setActiveMission(null);
                    }}
                  >
                  Change
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export const StyledHeader = inject('classificationStore', 'classificationActions', 'unicornStore', 'slidesStore')
(styled(Header)`
  position: fixed;
  top: 15px;
  background: #2B303C;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);
  width: 100%;
  a {
  color: #FFF;
  }
  
  .selectedMission {
    padding-left: 10px;
    position: relative;
    bottom: 8px;
    line-height: 54px;
    height: 54px;
    color: #fff;
    font-size: 16px;
  }
  
  .changeMissionBtn {
    padding-right: 10px;
    position: relative;
    bottom: 8px;
    color: #15deec;
    line-height: 54px;
    height: 54px;
    cursor: pointer;
    margin-left: 13px;
  }
  
  .parentClassificationBanner {
  text-align: center;
  width: 101%;
  top: 0;
  z-index: 1000;
  position: fixed;
  height: 16px;
  font-weight: bold;
  font-size: 11px;
  }
  
  .missionInfo {
    position: absolute;
    width: auto;
    height: 39px;
    right: 11px;
    top: 15px;
  }
`);