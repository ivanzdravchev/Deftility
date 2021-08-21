import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getJobShortDetails } from '../../../../api/jobsApi';
import JobShortDetails from '../../../jobs/JobShortDetails/JobShortDetails';
import BidForm from '../../../forms/Bid/BidForm';
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import './CreateBid.scss';

function CreateBid(props) {
  const { jobId } = useParams();

  const [job, setJob] = useState();
  const [jobIsLoaded, setJobIsLoaded] = useState(false);

  useEffect(() => {
    if (props.isAuthenticated) {
      getJobShortDetails(jobId).then(result => {
        setJob(result.data);
        setJobIsLoaded(true);
      }).catch(err => {
        if (!err.response) {
          console.error('Server unreachable.');
        } else if (err.response.status === 401) {
          toast.error('Unauthorized.');
          props.history.push('/login');
        } else if (err.response.status === 404) {
          toast.error('Job does not exist.');
          props.history.push('/jobs');
        }
      });
    } else {
      toast.error('Unauthorized.');
      props.history.push('/login');
    }
  }, [jobId, props.history, props.isAuthenticated]);

  return (
    <>
    {!props.isAuthenticated && <Redirect to={`/jobs/${jobId}`} />}
    {
      jobIsLoaded ?
      <div className="create-bid-container">
        <h1 className="bid-header">Project Details</h1>
        <JobShortDetails job={job} />
        <BidForm history={props.history} jobId={jobId} />
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

export default connect(mapStateToProps)(CreateBid);
