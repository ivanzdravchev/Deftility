import React from 'react';
import { useParams } from 'react-router-dom';
import { getTimeAgo } from '../../../utils';

import './JobDetails.scss';

export default function JobDetails() {
  const { id } = useParams();
  console.log(`job details - ID: ${id}`)

  const sampleJson = {
    id: "m8dj6sd42mr0",
    title: "Add online multiplayer to a local-multiplayer party game in Unity",
    description: "Pool Party is a fast-paced party game for you to enjoy with friends. It brings the satisfying physics of pool into an easy-to-pick-up party game. In Pool Party, you and your friends play as cute living balls and try to knock each other into holes. Players will get to master the simple yet tricky mechanics of rolling around the field and kicking other balls in order to parry, dodge or attack. They will battle it out across various game modes, alone or in teams, using an exciting blend of strategy and skill to find out who’s the king of the party.",
    category: "C# Development",
    createdOn: new Date(2021, 6, 2, 13, 49, 11),
    priceType: "Fixed",
    price: "100$",
    level: "Expert",
    skills: ["C#", "Unity", "Game Development", "3D"]
  }
  
  return (
    <div className="job-details-container">
      <h1>Job details</h1>
      <div className="job-details-wrapper">
        <div className="details-title">{sampleJson.title}</div>
        <div className="details-category">
          <p>{sampleJson.category}</p>
          <p>Posted {getTimeAgo(sampleJson.createdOn)}</p>
        </div>
        <div className="details-description">{sampleJson.description}</div>
        <div className="details-specifics">
          <div className="job-price">
            <p>{sampleJson.price}</p>
            <p>{sampleJson.priceType}</p>
          </div>
          <div className="job-experience">
            <p>{sampleJson.level}</p>
            <p>Experience</p>
          </div>
        </div>
        <div className="details-skills">
          <h3>Skills and Expertise</h3>
          <div className="skills-list">
            {sampleJson.skills.map((skill, index) => (
              <span className="skill-item" key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
