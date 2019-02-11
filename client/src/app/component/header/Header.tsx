import *as React from 'react';
import { observer } from 'mobx-react';
const Logo = require('../../../icon/FritzLogo.png');

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
        <nav className="navbar navbar-default bg-dark">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand text-white" href="#">
                <img className="logo" alt="FRiTZ" src={Logo} />
              </a>
            </div>
          </div>
        </nav>
        <div className="namingConvention pt-5 pl-4">
          <span className="text-white">DDTTTTZMONYY_TGT_NAME_ACTIVITY_ASSET_CLASSIFICATION</span>
        </div>
      </div>
    );
  }
}