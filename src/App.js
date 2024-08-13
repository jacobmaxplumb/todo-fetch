import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const response = await fetch("http://localhost:9000/todos");
    const todoItems = await response.json();
    setTodos(todoItems);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ margin: "10px" }}>
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
