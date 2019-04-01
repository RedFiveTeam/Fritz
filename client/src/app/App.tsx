import * as React from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Routes } from './Routes';
import { StyledHeader } from './component/header/Header';

export const WrappedRoutes = withRouter((Routes as any));

@observer
export class App extends React.Component {

  css = {
    height: 'auto',
  };

  render() {
    return (
      <div className="ParentAppBody">
        <div className="ParentHeader" style={{height: 91}}>
          <StyledHeader/>
        </div>
        <div className="ParentWrappedRoutes" style={this.css}>
          <WrappedRoutes/>
        </div>
      </div>
    );
  }
}

export const InjectedApp = (App);
