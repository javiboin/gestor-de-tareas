const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: String,
    title: String,
    content: String
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;