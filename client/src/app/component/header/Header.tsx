import *as React from 'react';
import { observer } from 'mobx-react';

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
                <img className="title" alt="FRiTZ"/>
              </a>
            </div>
          </div>
        </nav>
        <div className="namingConvention">
          <div className="mt-4">Naming Convention:</div>
          <span>DDTTTTZMONYY_TGT_NAME_ACTIVITY_ASSET_CLASSIFICATION</span>
        </div>
      </div>
    );
  }
}