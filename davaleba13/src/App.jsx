
import React, { useState, useCallback } from 'react';
import TaskList from './TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const addTask = useCallback((task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  }, []);

  const finishTask = useCallback((index) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      const [completedTask] = newTasks.splice(index, 1);
      setCompletedTasks((prevCompleted) => [...prevCompleted, completedTask]);
      return newTasks;
    });
  }, []);

  const deleteTask = useCallback((index) => {
    setCompletedTasks((prevCompletedTasks) => {
      const newCompletedTasks = [...prevCompletedTasks];
      newCompletedTasks.splice(index, 1);
      return newCompletedTasks;
    });
  }, []);

  const redoTask = useCallback((index) => {
    setCompletedTasks((prevCompletedTasks) => {
      const newCompletedTasks = [...prevCompletedTasks];
      const [redoTask] = newCompletedTasks.splice(index, 1);
      setTasks((prevTasks) => [...prevTasks, redoTask]);
      return newCompletedTasks;
    });
  }, []);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Enter new task"
        onKeyPress={(event) => {
          if (event.key === 'Enter' && event.target.value.trim()) {
            addTask(event.target.value.trim());
            event.target.value = '';
          }
        }}
      />
      <div className="columns">
        <TaskList
          title="To Be Performed"
          tasks={tasks}
          handleTaskAction={finishTask}
          actionLabel="Finish"
        />
        
        <TaskList
          title="Completed Works"
          tasks={completedTasks}
          handleTaskAction={deleteTask}
          secondaryAction={redoTask}
          actionLabel="Delete"
          secondaryLabel="Redo"
        />
      </div>
    </div>
  );
}

export default App;
