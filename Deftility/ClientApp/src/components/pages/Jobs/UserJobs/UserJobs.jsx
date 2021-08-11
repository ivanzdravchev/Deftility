import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import JobShortDetails from '../../../jobs/JobShortDetails/JobShortDetails';
import { getAllUserJobs } from '../../../../api/jobsApi';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import './UserJobs.scss';

function UserJobs(props) {
  const [userJobs, setUserJobs] = useState([]);
  const [userJobsAreLoaded, setUserJobsAreLoaded] = useState(false);

  useEffect(() => {
    if (props.isAuthenticated) {
      getAllUserJobs().then(result => {
        setUserJobs(result.data);
        setUserJobsAreLoaded(true);
      }).catch(err => {
        if (!err.response) {
          console.error('Server unreachable.');
        }
        console.log({...err});
      });
    } else {
      toast.error('Unauthorized.');
      props.history.push('/login');
    }
  }, [props.history, props.isAuthenticated]);

  return (
    <>
    {!props.isAuthenticated && <Redirect to='/' />}
    {
      userJobsAreLoaded ?
      <div className="userjobs-container">
        <h1 className="userjobs-header">My Projects</h1>
        {
          userJobs.map((job, index) => (
            <JobShortDetails job={job} key={job.title + index}>
              <div className="userjobs-links">
                <Link to={`/bids/${job.id}`} className="userjobs-link">See biddings</Link>
              </div>
            </JobShortDetails>
          ))
        }
      </div>
    : <Loader className="loader" type="Oval" color="#000" height={100} width={100} />
    }
    </>
    
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.userReducer.token ? true : false
  };
}

export default connect(mapStateToProps)(UserJobs);
