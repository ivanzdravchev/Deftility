import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import SignUp from './components/pages/Signup/Signup';
import CreateJob from './components/pages/Jobs/CreateJob/CreateJob';
import JobList from './components/pages/Jobs/JobList/JobList';
import JobDetails from './components/pages/Jobs/JobDetails/JobDetails';
import CreateBid from './components/pages/Jobs/CreateBid/CreateBid';
import UserJobs from './components/pages/Jobs/UserJobs/UserJobs';
import NotFound from './components/pages/Error/NotFound';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
          <Route exact path='/create-job' component={CreateJob} />
          <Route exact path='/apply/:jobId' component={CreateBid} />
          <Route exact path='/projects' component={UserJobs} />
          <Route component={NotFound} />
        </Switch>
        <ToastContainer />
      </Layout>
    );
  }
}
