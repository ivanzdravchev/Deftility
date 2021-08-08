import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBid } from '../../../../api/bidsApi';
import { getJobForBidding } from '../../../../api/jobsApi';
import { getShortenedText } from '../../../../utils';
import SkillsList from '../../../jobs/SkillsList/SkillsList';
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
      getJobForBidding(jobId).then(result => {
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

  const [formState, setFormState] = useState({
    bidAmount: 0,
    estimate: '',
    message: ''
  });

  const [formErrorState, setFormErrorState] = useState({
    bidAmount: false,
    estimate: false,
    message: false
  });

  function onBidAmountChange(event) {
    const bidAmount = Math.floor(event.target.value);

    setFormState({
      ...formState,
      bidAmount
    });
  }

  function onBidEstimateChange(event) {
    setFormState({
      ...formState,
      estimate: event.target.value
    });
  }

  function onMessageChange(event) {
    setFormState({
      ...formState,
      message: event.target.value
    });
  }

  function onSubmit(event) {
    event.preventDefault();

    const newFormErrorState = {
      bidAmount: false,
      estimate: false,
      message: false
    };

    if (formState.bidAmount < 1 || formState.bidAmount > 1000000) {
      newFormErrorState.bidAmount = true;
    }
    if (formState.estimate.length < 1 || formState.estimate.length > 25) {
      newFormErrorState.estimate = true;
    }
    if (formState.message.length < 20) {
      newFormErrorState.message = true;
    }

    setFormErrorState(newFormErrorState);

    // if there's at least 1 error
    if (Object.keys(newFormErrorState).some(key => newFormErrorState[key])) {
      return;
    }

    const apiCallJson = {
      amount: formState.bidAmount,
      estimate: formState.estimate,
      message: formState.message,
      jobId
    };

    createBid(apiCallJson).then((response) => {
      props.history.push('/jobs');
      toast.info(response.data.message);
    }).catch(err => {
      if (!err.response) {
        console.error('Server unreachable.');
      } else if (err.response.status === 400) {
        toast.error(err.response.data.title);
      } else if (err.response.status === 404) {
        toast.error(err.response.data.error);
      } else if (err.response.status === 409) {
        toast.error(err.response.data.error);
      }
    });
  }

  return (
    <>
    {!props.isAuthenticated && <Redirect to={`/jobs/${jobId}`} />}
    {
      jobIsLoaded ?
      <div className="create-bid-container">
      <div className="project-info-wrapper">
        <h1>Project Details</h1>
        {
          job.lowestRate === job.highestRate
            ? <span className="project-price">{job.lowestRate}€</span>
            : <span className="project-price">{job.lowestRate}€ - {job.highestRate}€</span>
        }
        <div className="project-data">
          <h3>Description</h3>
          <p className="project-description">{getShortenedText(job.description, 240)}</p>
          <h3>Skills</h3>
          <SkillsList skills={job.skills} />
        </div>
      </div>
      <div className="create-bid-wrapper">
        <h1>Make a Bid on this project</h1>
        <h3>Bid Details</h3>
        <form onSubmit={onSubmit}>
          <div className="proposal-details">
            <div className="bid-input-pair">
              <p>Bid Amount</p>
              <input
                type="number"
                name="bid-amount"
                placeholder="Bid amount"
                onChange={onBidAmountChange} />
              <p className={formErrorState.bidAmount ? "input-error" : "input-error hidden"}>Invalid amount</p>
            </div>
            <div className="bid-input-pair">
              <p>This project will be delivered in</p>
              <input
                type="text"
                name="bid-estimate"
                placeholder="e.g. 7 days"
                maxLength="25"
                onChange={onBidEstimateChange} />
              <p className={formErrorState.estimate ? "input-error" : "input-error hidden"}>Please write an estimate</p>
            </div>
          </div>
          <div className="proposal-text">
            <p>Describe your proposal</p>
            <textarea
              placeholder="Describe your proposal here..."
              onChange={onMessageChange} />
            <p className={formErrorState.message ? "input-error" : "input-error hidden"}>Proposal is too short.</p>
          </div>
          <button className="place-bid-btn" type="submit">Place Bid</button>
        </form>
      </div>
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
