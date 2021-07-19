import React from 'react';
import JobListing from '../../../jobs/JobListing/JobListing';

import './JobList.scss';

export default function JobList() {
  const sampleJobsJson = [
    {
      id: "j7x911djh23z",
      title: "C# Script for Unity (Small Task)",
      description: "This is a short task for a project for a supermarket. Ideally what needs to be done is once the user inputs a shopping list, display the most optimum shortest path.  Currently using the ARWAY SDK. What's required at the moment - Display the route to be taken aisle-wise in the terminal once a shopping list is provided( can be a .csv file for now), aisle-wise distances can be hardcoded.  Shortest possible path to be taken using A* algorithm or any other. Needs to be done in less than 24 hours.",
      createdOn: new Date(2021, 6, 6, 16, 25, 36),
      priceType: "Fixed",
      price: "20$",
      level: "Intermediate"
    },
    {
      id: "m8dj6sd42mr0",
      title: "Add online multiplayer to a local-multiplayer party game in Unity",
      description: "Pool Party is a fast-paced party game for you to enjoy with friends. It brings the satisfying physics of pool into an easy-to-pick-up party game. In Pool Party, you and your friends play as cute living balls and try to knock each other into holes. Players will get to master the simple yet tricky mechanics of rolling around the field and kicking other balls in order to parry, dodge or attack. They will battle it out across various game modes, alone or in teams, using an exciting blend of strategy and skill to find out who’s the king of the party.",
      createdOn: new Date(2021, 6, 2, 13, 49, 11),
      priceType: "Fixed",
      price: "100$",
      level: "Expert"
    }
  ];

  return (
    <div className="job-list">
      {sampleJobsJson.map((job, index) => (
        <JobListing job={job} key={job.id} />
      ))}
    </div>
  );
}
