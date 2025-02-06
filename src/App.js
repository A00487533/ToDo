import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [tasks, setTasks] = useState([]); // State to store the list of tasks

  // Load saved tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Function to add a new task
  const addTask = (task, priority) => {
    const newTasks = [
      ...tasks,
      { id: Date.now(), text: task, priority: priority },
    ];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks)); // Save tasks to localStorage
  };

  // Function to remove a task by id
  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save updated tasks to localStorage
  };

  return (
    <div className="container">
      <h1 className="title">📝 To-Do List</h1>
      <div className="input-container">
        {/* Input field to add new tasks */}
        <input
          type="text"
          id="taskInput"
          placeholder="Enter a new task..."
          className="task-input"
        />
        
        {/* Dropdown to select the task priority */}
        <select id="prioritySelect" className="priority-select">
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>

        {/* Button to add the task to the list */}
        <button
          className="add-btn"
          onClick={() => {
            const input = document.getElementById("taskInput");
            const priority = document.getElementById("prioritySelect").value;
            if (input.value.trim()) {
              addTask(input.value, priority);
              input.value = ""; // Clear input after adding
            }
          }}
        >
          ➕ Add Task
        </button>
      </div>

      {/* Display list of tasks */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.priority}`}>
            {/* Display task text */}
            <span className="task-text">{task.text}</span>
            {/* Button to delete task */}
            <button className="delete-btn" onClick={() => removeTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
