import * as React from 'react';
import { CSSProperties } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledClassificationBanner } from '../classification/ClassificationBanner';
import { ClassificationStore } from '../classification/store/ClassificationStore';
import { ClassificationActions } from '../classification/ClassificationActions';
import { StyledUnicornContainer } from './UnicornContainer';

const Logo = require('../../../icon/FritzLogo.svg');

interface Props {
  className?: string;
  classificationStore?: ClassificationStore;
  classificationActions?: ClassificationActions;
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
              </div>
            </div>
          </nav>
        </div>
        <StyledUnicornContainer/>
      </div>
    );
  }
}

export const StyledHeader = inject('classificationStore', 'classificationActions')
(styled(Header)`
  position: fixed;
  top: 15px;
  background: #2B303C;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  a {
    color: #FFF;
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

`);