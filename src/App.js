import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import SearchResults from './containers/SearchResults/SearchResults'
import Search from './components/Search/Search'

class App extends Component {

 

  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <>
          <Search />
          <Route path='/results/:query' exact component={SearchResults} />
          
          {/* <Route path='/pokemon/:name' exact component={Pokemon} /> */}
        </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;


