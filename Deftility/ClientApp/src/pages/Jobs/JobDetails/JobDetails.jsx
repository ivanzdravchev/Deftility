import React from 'react';
import { useParams } from 'react-router-dom';

import './JobDetails.scss';

export default function JobDetails() {
  const { id } = useParams();
  
  return (
    <div>job details - ID: {id}</div>
  );
}
