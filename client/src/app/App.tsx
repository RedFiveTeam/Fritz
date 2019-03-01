import * as React from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Routes } from './Routes';
import { StyledHeader } from './component/header/Header';

export const WrappedRoutes = withRouter((Routes as any));

@observer
export class App extends React.Component {

  css = {
    background: 'linear-gradient(360deg,#1E222A 0%,#39414E 100%)'
  };

  render() {
    return (
        <div className="w-100 h-100 mb-0 pb-0" style={this.css}>
          <StyledHeader/>
          <WrappedRoutes/>
        </div>
    );
  }
}

export const InjectedApp = (App);
