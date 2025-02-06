import React, { useState, useEffect } from "react";

const TodoList = () => {
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
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input type="text" id="taskInput" placeholder="Enter task..." />
      <button onClick={() => {
        const taskInput = document.getElementById("taskInput");
        if (taskInput.value) {
          addTask(taskInput.value);
          taskInput.value = "";
        }
      }}>Add Task</button>
      
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => removeTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
