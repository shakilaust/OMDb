import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Dashboard from '../container/Dashboard';
import MoviePage from '../container/MoviePage';
import RecentlyView from '../container/RecentlyView';
import WatchList from '../container/WatchList';

const Routes = props => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route
            path="/omdb/:type/:id"
            component={MoviePage}
        />

        <Route exact path='/recently-viewed' component={RecentlyView} />
        <Route exact path='/watch-list' component={WatchList} />
        
      </Switch>
    </Router>
  );
};

export default Routes;