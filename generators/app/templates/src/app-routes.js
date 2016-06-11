import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import { store } from './index';

import Application from './components/Application';
import Home from './pages/home'
import Information from './pages/information'

const AppRoutes = (
  <Route path="/" component={Application}>
    <IndexRoute component={Home} />
    <Route path="home">
      <IndexRoute component={Home}/>
    </Route>
    <Route path="info">
      <IndexRoute component={Information}/>
    </Route>
  </Route>
);

export default AppRoutes;

