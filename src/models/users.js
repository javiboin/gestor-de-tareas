const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    birth_date: Date,
    email: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;