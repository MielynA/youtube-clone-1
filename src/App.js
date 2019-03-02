import React, { Component } from 'react';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import {BrowserRouter, Route} from 'react-router-dom'
import SearchResults from './containers/SearchResults/SearchResults'
import Search from './components/Search/Search'
import User from './containers/User/User'
import Feeds from './containers/Feeds/Feeds'
import Home from './containers/Home/Home'

class App extends Component {
  

  render() {
    return (
      <React.Fragment>
      <div className="App">
        <BrowserRouter>
        <>
          <Search />
          <Route path='/' exact component={Home} />
          <Route path='/results/:query' exact component={SearchResults} />
          <Route path='/video/:video_id' exact component={VideoPlayer} />
          <Route exact path='/Editor:/user'  component={User} />
          <Route exact path='/Editor:/feededitor'  component={Feeds} />
        </>
        </BrowserRouter>
      </div>
         
      </React.Fragment>
    );
  }
}

export default App;


