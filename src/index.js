import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Home from './components/home/index'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
    </Route>
  </Router>,
  document.getElementById('App')
);
