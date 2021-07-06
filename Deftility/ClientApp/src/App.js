import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './layout/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/Signup';
import JobList from './pages/Jobs/JobList/JobList';
import JobDetails from './pages/Jobs/JobDetails/JobDetails';
import NotFound from './pages/Error/NotFound';

import './sass/_global.scss';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/jobs' component={JobList} />
          <Route exact path='/jobs/:id' component={JobDetails} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}
