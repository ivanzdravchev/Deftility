import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkillsList from '../../../jobs/SkillsList/SkillsList';
import Loader from 'react-loader-spinner';
import { getJobDetails } from '../../../../api/jobsApi.js';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTimeAgo, FormatDate } from '../../../../utils';

import './JobDetails.scss';

function JobDetails(props) {
  const { id } = useParams();

  const [job, setJob] = useState();
  const [jobIsLoaded, setJobIsLoaded] = useState(false);

  useEffect(() => {
    getJobDetails(id).then(result => {
      setJob(result.data);
      setJobIsLoaded(true);
    }).catch(err => console.error(err));
    
    return () => {
      setJob({});
    };
  }, [id]);
  
  return (
    <>
    {
      jobIsLoaded ?
      <div className="job-details-container">
        <h1>Job details</h1>
        <div className="job-details-wrapper">
          <div className="job-details-left">
            <div className="details-title">{job.title}</div>
            <div className="details-category">
              <p>{job.category}</p>
              <p>Posted {getTimeAgo(new Date(job.createdOn + "+00:00"))}</p>
            </div>
            <div className="details-description">{job.description}</div>
            <div className="details-specifics">
              <div className="job-price">
                {
                  job.lowestRate === job.highestRate
                    ? <p>{job.lowestRate}€</p>
                    : <p>{job.lowestRate}€ - {job.highestRate}€</p>
                }
                <p>{job.priceType}</p>
              </div>
              <div className="job-experience">
                <p>{job.experienceLevel}</p>
                <p>Experience</p>
              </div>
            </div>
            <div className="details-skills">
              <h3>Skills and Expertise</h3>
              <SkillsList skills={job.skills} />
            </div>
          </div>
          <div className="job-details-right">
            {
              props.isAuthenticated ? 
                <Link className="apply-link" to={`/apply/${id}`}>Make a Bid</Link>
                :
                <>
                  <h2 className="register-label">Want to apply? Sign up now!</h2>
                  <Link className="apply-link" to={'/signup'}>Sign up</Link>
                </>
            }
            <div className="job-side-section">
              <h3>About the client</h3>
              <p>{job.clientJobsCount} jobs posted</p>
              <p>Member since: {FormatDate(new Date(job.clientRegisterDate))}</p>
            </div>
            <div className="job-side-section">
              <h3>Job activity</h3>
              <p>Applicants: {job.applicants}</p>
            </div>
          </div>
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

export default connect(mapStateToProps)(JobDetails);
