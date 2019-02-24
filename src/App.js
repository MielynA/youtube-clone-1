import React, { Component } from 'react';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';




class App extends Component {
  render() {
    return (
      <React.Fragment>
      <div className="App">
        <p>We are the best team! don't @ me</p>
      </div>
      <VideoPlayer />    
      </React.Fragment>
    );
  }
}

export default App;


