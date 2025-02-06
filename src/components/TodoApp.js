import React, { useState, useEffect } from "react";
import "./TodoApp.css";

const TodoApp = () => {
  const STORAGE_KEY = "tasks";

  // Load tasks from localStorage when the app starts
  const getStoredTasks = () => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return [];
    }
  };

  const [tasks, setTasks] = useState(getStoredTasks);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Normal");

  // Save tasks to localStorage whenever `tasks` change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    const newTask = { id: Date.now(), text: task, priority };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>To-Do App (PWA)</h1>
      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((t) => (
          <li key={t.id} className={`priority-${t.priority.toLowerCase()}`}>
            {t.text} - <b>{t.priority}</b>
            <button onClick={() => removeTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
