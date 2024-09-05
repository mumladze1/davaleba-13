import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ title, tasks, handleTaskAction, actionLabel, secondaryAction, secondaryLabel }) {
  console.log(`Rendering task list: ${title}`);
  return (
    <div className="task-list">
      <h2>{title}</h2>
      <ul>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            handleTaskAction={() => handleTaskAction(index)}
            actionLabel={actionLabel}
            secondaryAction={secondaryAction ? () => secondaryAction(index) : null}
            secondaryLabel={secondaryLabel}
          />
        ))}
      </ul>
    </div>
  );
}

export default React.memo(TaskList);

