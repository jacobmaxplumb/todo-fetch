import { useEffect, useState } from "react";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const getTodos = async () => {
    const response = await fetch("http://localhost:9000/todos");
    const todoItems = await response.json();
    setTodos(todoItems);
  };

  const addTodo = async () => {
    const response = await fetch("http://localhost:9000/todos", {
      method: "POST",
      body: JSON.stringify({ text: text, completed: false }),
    });
    const data = await response.json();
    setTodos([...todos, data]);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ margin: "10px" }}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{ textDecoration: todo.completed ? "line-through" : "" }}
        >
          {todo.text}
        </div>
      ))}
    </div>
  );
}

export default App;
