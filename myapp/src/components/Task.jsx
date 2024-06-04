import React from 'react';

function Task({title , description}) {
  return (
    <div className="task">
      <div>
      <p>{title}</p>
      <span>{description}</span>
      </div>
      <button>-</button>
    </div>
  )
};

export default Task;
