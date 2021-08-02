import React from 'react';
import { Link } from 'react-router-dom';
import SkillsList from '../../jobs/SkillsList/SkillsList';
import { getShortenedText, getTimeAgo, isNew } from '../../../utils';

import './JobListing.scss'

export default function JobListing({ job }) {
  const {
    id,
    title,
    description,
    createdOn,
    priceType,
    lowestRate,
    highestRate,
    experienceLevel
  } = job;

  return (
    <div className="job-offer-listing">
      <Link to={`/jobs/${id}`} className="job-title">{title}</Link>
      <div className="job-status">
        {
          isNew(new Date(createdOn + "+00:00")) &&
          <span className="job-new">New</span>
        }
        <span>{getTimeAgo(new Date(createdOn + "+00:00"))}</span>
      </div>
      <div className="job-specifics">
        <div className="job-price">
          {
            lowestRate === highestRate
              ? <p>{lowestRate}€</p>
              : <p>{lowestRate}€ - {highestRate}€</p>
          }
          <p>{priceType}</p>
        </div>
        <div className="job-experience">
          <p>{experienceLevel}</p>
          <p>Experience</p>
        </div>
      </div>
      <div className="job-description">
        {getShortenedText(description, 220)}
      </div>
      <SkillsList skills={job.skills} />
      <Link to={`/jobs/${id}`} className="job-details">See More</Link>
    </div>
  );
}
