import React from 'react';
import SkillsList from '../SkillsList/SkillsList';
import { getShortenedText } from '../../../utils';

import './JobShortDetails.scss';

export default function JobShortDetails(props) {
  const { job } = props;

  return (
    <div className="project-short-info-wrapper">
      <h1>{getShortenedText(job.title, 45)}</h1>
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
      {props.children}
    </div>
  );
}
