import React, { useState } from 'react';
import { createBid } from '../../../api/bidsApi';
import { toast } from 'react-toastify';

import './BidForm.scss';

export default function BidForm(props) {
  const { jobId } = props;

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
        toast.error(err.response.data.error);
      } else if (err.response.status === 404) {
        toast.error(err.response.data.error);
      } else if (err.response.status === 409) {
        toast.error(err.response.data.error);
      }
    });
  }

  return (
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
  );
}
