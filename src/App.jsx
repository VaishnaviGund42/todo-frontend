import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:5000/api/todos";

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    await axios.post(API, { title });
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.put(`${API}/${todo.id}`, {
      completed: !todo.completed,
    });
    fetchTodos();
  };

  return (
    <div className="app">
      <div className="card">
        <h1>✨ Daily Task Planner</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder="Write your task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? "done" : ""}`}
            >
              <span onClick={() => toggleTodo(todo)}>
                {todo.title}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>❌</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
