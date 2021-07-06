import React from 'react';
import { Link } from 'react-router-dom';

import './JobListing.scss'

export default function JobListing(props) {
  const { id, title, description, createdOn, priceType, price, level }  = props.job;

  // make sure we don't cut the description in the middle of a word, target space between words instead
  function getShortenedDescription(description) {
    if (description.length < 230) {
      return description;
    }

    const cutOffText = description.substring(220);
    const indexOfSpace = cutOffText.indexOf(' ');

    return description.substring(0, 220 + indexOfSpace) + '...';
  }

  function getTimeAgo(date) {
    const dateInSeconds = Math.floor(date.getTime() / 1000);
    const nowInSeconds = Math.floor(new Date().getTime() / 1000);
    const secondsDifference = nowInSeconds - dateInSeconds;
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const monthsDifference = Math.floor(daysDifference / 30)
    const yearsDifference = Math.floor(monthsDifference / 12);

    if (secondsDifference < 60) {
      return 'Just Now';
    }

    if (minutesDifference < 60) {
      return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
    }

    if (hoursDifference < 24) {
      return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
    }

    if (daysDifference < 30) {
      return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
    }

    if (monthsDifference < 12) {
      return `${monthsDifference} month${monthsDifference !== 1 ? 's' : ''} ago`;
    }

    if (yearsDifference > 0) {
      return `${yearsDifference} year${yearsDifference !== 1 ? 's' : ''} ago`;
    }
  }

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
          {getShortenedDescription(description)}
        </div>
        <Link to={`/jobs/${id}`} className="job-details">See More</Link>
      </div>
  );
}
