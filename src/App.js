import React, { Component } from 'react';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import {BrowserRouter, Route} from 'react-router-dom'
import SearchResults from './containers/SearchResults/SearchResults'
import Search from './components/Search/Search'
import User from './containers/User/User'

class App extends Component {

  render() {
    return (
      <React.Fragment>
      <div className="App">
        <BrowserRouter>
        <>
          <Search />
          <Route path='/results/:query' exact component={SearchResults} />
          <Route path='/video/:video_id' exact component={VideoPlayer} />
          <Route exact path='/Editor:/user'  component={User} />
        </>
        </BrowserRouter>
      </div>
         
      </React.Fragment>
    );
  }
}

export default App;


