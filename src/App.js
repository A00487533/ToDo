import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const addTask = (task, priority) => {
    const newTasks = [
      ...tasks,
      { id: Date.now(), text: task, priority: priority },
    ];
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
        
        <select id="prioritySelect" className="priority-select">
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>

        <button
          className="add-btn"
          onClick={() => {
            const input = document.getElementById("taskInput");
            const priority = document.getElementById("prioritySelect").value;
            if (input.value.trim()) {
              addTask(input.value, priority);
              input.value = "";
            }
          }}
        >
          ➕ Add Task
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.priority}`}>
            <span className="task-text">{task.text}</span>
            <button className="delete-btn" onClick={() => removeTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
