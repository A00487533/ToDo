import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const addTask = (task) => {
    const newTasks = [...tasks, { id: Date.now(), text: task }];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="container">
      <h1 className="title">📝 To-Do List</h1>
      <div className="input-container">
        <input type="text" id="taskInput" placeholder="Enter a new task..." className="task-input" />
        <button
          className="add-btn"
          onClick={() => {
            const input = document.getElementById("taskInput");
            if (input.value.trim()) {
              addTask(input.value);
              input.value = "";
            }
          }}
        >
          ➕ Add Task
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span className="task-text">{task.text}</span>
            <button className="delete-btn" onClick={() => removeTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
