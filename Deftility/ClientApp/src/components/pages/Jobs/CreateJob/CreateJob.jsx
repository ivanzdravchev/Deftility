import React from 'react';
import JobForm from '../../../forms/Job/JobForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './CreateJob.scss';

function CreateJob(props) {
  return (
    <>
      {!props.isAuthenticated && <Redirect to="/" />}
      <div className="create-job-header-wrapper">
        <div className="create-job-header">
          <h1>Tell us what you need done</h1>
          <p>Contact some of our most skilled freelancers within minutes, view their profiles, ratings and start chats with them. Pay the freelancer when you are 100% satisfied with their work.</p>
        </div>
      </div>
      <JobForm />
    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.userReducer.token ? true : false
  };
}

export default connect(mapStateToProps)(CreateJob);
