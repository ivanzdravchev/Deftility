import React from 'react';

import './SkillsList.scss';

export default function SkillsList({ skills }) {
  return (
    <div className="skills-list">
      {
        Array.isArray(skills) ?
          skills.map((skill, index) => (
            <span className="skill-item" key={skill.id}>{skill.name}</span>
          ))
        : ''
      }
    </div>
  );
}
