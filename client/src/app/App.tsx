import React, { Component } from 'react';
import underConstruction from '../resources/under-construction_animated.gif';

class App extends Component {
  render() {
    return (
      <div className="App">
        This is the Walking Skeleton for the Fritz application by Lab-1.<br/>
        This page is under construction...<br/>
        <img src={underConstruction}/>
      </div>
    );
  }
}

export default App;
