import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
const Logo = require('../../../icon/FritzLogo.svg');

interface Props {
  className?: string;
}

@observer
export class Header extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                <img className="logo" alt="FRiTZ" src={Logo} />
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export const StyledHeader = (styled(Header)`
  position: relative;
  top: 26px;
  background: #2B303C;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.5);
  
  a {
  color: #FFF;
  }
`);