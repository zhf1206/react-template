import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../views/home/home';
import Welcome from '../views/welcome/welcome';

export default class RouteConfig extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/home' exact component={Home} />
          <Route path='/welcome' component={Welcome} />
          <Redirect to='/' />
        </Switch>
      </Router>
    )
  }
}