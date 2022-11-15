import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getAllJobBids } from '../../../../api/bidsApi';
import Loader from 'react-loader-spinner';
import BidListing from '../../../jobs/BidListing/BidListing';

import './JobBids.scss';

function JobBids() {
  const { id } = useParams();

  const [jobBids, setJobBids] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    getAllJobBids(id).then((result) => {
      setJobBids(result.data);
      setHasLoaded(true);
    }).catch(err => console.error(err));

     // cleanup function
    return () => {
      setJobBids([]);
    }
  }, [id]);

  return (
    <>
    {
      hasLoaded ?
      <div className="job-bids-list-wrapper">
        <h1>Project bids</h1>
        {
          jobBids.length > 0 ?
          jobBids.map((bid, i) => (
            <BidListing bidInfo={bid} key={bid.id}></BidListing>
          ))
          : <h1>No bids</h1>
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

export default connect(mapStateToProps)(JobBids);
