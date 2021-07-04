import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './layout/Layout/Layout.jsx';
import Home from './pages/Home/Home.jsx';

import './sass/_global.scss';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </Layout>
    );
  }
}
