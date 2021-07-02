import React, { Component } from 'react';
import { Route } from 'react-router';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div>Test</div>
      // <Layout>
      //   <Route exact path='/' component={Home} />
      // </Layout>
    );
  }
}
