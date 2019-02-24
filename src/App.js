import React, { Component } from 'react';
import { User } from './containers/User/User'

class App extends Component {
  render() {
    return (<>
      <div className="App">
        <p>We are the best team! don't @ me</p>
      </div>
      <User/>
      </>
    );
  }
}

export default App;


