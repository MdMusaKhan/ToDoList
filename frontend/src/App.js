import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // State for storing todos and task input value
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // Fetch todos from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => setTodos(response.data))  // Set todos state with fetched data
      .catch(err => console.error('Error fetching todos:', err));
  }, []);  // Empty dependency array means it runs only once when the component mounts

  // Add a new todo to the backend and update state
  const addTodo = () => {
    if (task.trim() === '') return; // Don't add empty tasks
    axios.post('http://localhost:5000/api/todos', { task })
      .then(response => {
        setTodos([...todos, response.data]);  // Add the new todo to the todos list
        setTask('');  // Clear the input field after adding
      })
      .catch(err => console.error('Error adding todo:', err));
  };

  // Delete a todo from the backend and update state
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));  // Remove deleted todo from the list
      })
      .catch(err => console.error('Error deleting todo:', err));
  };

  return (
    <div>
      <h1>Simple To-Do App</h1>
      
      {/* Input field to add a task */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}  // Update task state on input change
        placeholder="Add a task"
      />
      <button onClick={addTodo}>Add</button>
      
      {/* Display the list of todos */}
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.task}  {/* Display task */}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>  {/* Delete task button */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
