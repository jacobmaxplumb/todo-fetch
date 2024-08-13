import { useEffect, useState } from "react";

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

  const handleUpdateOrDelete = async (todo) => {
    if (todo.completed) {
      await fetch(`http://localhost:9000/todos/${todo.id}`, {
        method: 'DELETE'
      })
    } else {
      await fetch(`http://localhost:9000/todos/${todo.id}`, {
        method: 'PUT',
        body: JSON.stringify({...todo, completed: true})
      })
    }
    getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ margin: "10px" }}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      {todos.map((todo) => (
        <div
          onClick={() => handleUpdateOrDelete(todo)}
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
