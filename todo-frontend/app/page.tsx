'use client';
import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  title: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

const API = '/api/todos';


  // Fetch todos on page load
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then((data: Todo[]) => setTodos(data))
      .catch(err => console.error(err));
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: text }),
      });

      const newTodo: Todo = await res.json();
      setTodos(prev => [...prev, newTodo]);
      setText('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <h1>Simple Todo App</h1>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter todo"
        style={{ marginRight: 10 }}
      />

      <button onClick={addTodo} disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </button>

      <ul style={{ marginTop: 20 }}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
