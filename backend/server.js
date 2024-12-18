const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import cors package
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for both localhost:3000 and 192.168.56.1:3000
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.56.1:3000']
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Todo model
const Todo = mongoose.model('Todo', new mongoose.Schema({
  task: { type: String, required: true }
}));

// GET: Fetch all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST: Add a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// DELETE: Remove a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).end(); // No content to return after deletion
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
