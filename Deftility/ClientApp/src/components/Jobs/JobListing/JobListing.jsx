import React from 'react';
import { Link } from 'react-router-dom';
import { getShortenedText, getTimeAgo} from '../../../utils';

import './JobListing.scss'

export default function JobListing(props) {
  const { id, title, description, createdOn, priceType, price, level }  = props.job;

  return (
    <div className="job-offer-listing">
        <Link to={`/jobs/${id}`} className="job-title">{title}</Link>
        <div className="job-status">
          <span className="job-new">New</span>
          <span>{getTimeAgo(createdOn)}</span>
        </div>
        <div className="job-specifics">
          <div className="job-price">
            <p>{price}</p>
            <p>{priceType}</p>
          </div>
          <div className="job-experience">
            <p>{level}</p>
            <p>Experience</p>
          </div>
        </div>
        <div className="job-description">
          {getShortenedText(description, 220)}
        </div>
        <Link to={`/jobs/${id}`} className="job-details">See More</Link>
      </div>
  );
}
