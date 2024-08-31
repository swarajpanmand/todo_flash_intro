import React, { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newTask }),
    });
    if (response.ok) {
      setNewTask(""); //clear the input field
      fetchTasks(); //fetch the updated list of tasks
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchTasks(); //fetch the updated list of tasks
    }
  };

  const handleUpdate = async (id, newContent) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newContent }),
    });
    if (response.ok) {
      fetchTasks(); //fetch the updated list of tasks
    }
  };

  return (
    <div className="app">
      <h1>ToDo List</h1>
      <div className="content">
        <table>
          {(tasks.length > 0) && (
            <thead>
              <tr>
                <th>Task</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
            </thead>  
          )}
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.content}</td>
                <td>{new Date(task.date_created).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                  <button
                    onClick={() => {
                      const newContent = prompt("Enter new content", task.content);
                      if (newContent) {
                        handleUpdate(task.id, newContent);
                      }
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;