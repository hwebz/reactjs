import React from 'react';
import ReactDOM from 'react-dom';

// first we import some components
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './App';
import About from './About';
import Home from './Home';
import Repos from './Repos';
import RepoDetails from './RepoDetails';
import ServerError from './ServerError';

import './index.css';

ReactDOM.render(
  (<Router history={createBrowserHistory()}>
  	<Route path="/" component={App}>
  		// <Route path="???" component={Home}/>
  		<IndexRoute component={Home}/>
  		<Route path="about" component={About} title="About Us"/>
  		<Route path="repos" component={Repos}>
  			// Add the route, nested where we want the UI to nest
        // <Route path="repo/details/:repo_name" component={RepoDetails} /> // relative path
  			<Route path="/repo/:repo_name" component={RepoDetails} /> // absolute path
  		</Route>
      <Route path="error" component={ServerError} />
  	</Route>
  </Router>),
  document.getElementById('root')
);
