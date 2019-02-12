import * as React from 'react';
import { Component } from 'react';
import { Header } from './component/header/Header';
import { AppBody } from './component/body/AppBody';

class App extends Component {

  css = {
    background: 'linear-gradient(360deg, #1E222A 0%, #39414E 100%)'
  };

  render() {
    return (
        <div className="w-100 h-100 m-0 p-0" style={this.css}>
          <Header/>
          <AppBody/>
        </div>
    );
  }
}

export default App;
