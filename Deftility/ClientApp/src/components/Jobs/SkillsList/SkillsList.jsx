import React from 'react';

import './SkillsList.scss';

export default function SkillsList({ skills, className }) {
  const styleClass = className ? `skills-list ${className}` : "skills-list";

  return (
    <div className={styleClass}>
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
