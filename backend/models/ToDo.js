const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false  // Fixed typo here
    },
});

module.exports = mongoose.model('ToDo', ToDoSchema); // Fixed the naming to match
