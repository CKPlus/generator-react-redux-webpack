import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import { store } from './index';

import Application from './components/Application';
import Home from './pages/home'

const AppRoutes = (
  <Route path="/" component={Application}>
    <IndexRoute component={Home} />
    <Route path="home">
      <Route component={Home}/>
    </Route>
  </Route>
);

export default AppRoutes;