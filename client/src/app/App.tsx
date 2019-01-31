import * as React from 'react';
import underConstruction from '../resources/under-construction_animated.gif';
import { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        This is the Walking Skeleton for the Fritz application by Lab-1.<br/><br/>
        This page is under construction...<br/>
        <img src={underConstruction}/>
      </div>
    );
  }
}

export default App;
