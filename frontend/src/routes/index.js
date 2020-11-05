import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Dashboard from '../container/Dashboard';
import MovideOrSerialPage from '../container/MovideOrSerialPage';
import RecentlyView from '../container/RecentlyView';
import WatchList from '../container/WatchList';

const Routes = props => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route exact path='/recently-viewed' component={RecentlyView} />
        <Route exact path='/watch-list' component={WatchList} />
        <Route path='/omdb/:type/:id' componet={MovideOrSerialPage} />
        
      </Switch>
    </Router>
  );
};

export default Routes;