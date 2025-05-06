const express = require('express');
const router = express.Router();

const data_users = [
    {
        id: "1",
        username: "user1",
        password: "password1",
        name: "User One",
        birth_date: "1990-01-01",
        email: "user1@gmail.com"
    }
];

const getAllUsers = (req, res) => {
    res.json(data_users);
};

const getUserById = (req, res) => {
    const { id } = req.params;
    const user = data_users.find(data => id === data.id);
    res.json(user); 
};

const createUser = (req, res) => {
    const newUser = { 
        id: `${data_users.length + 1}`, 
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        birth_date: req.body.birth_date,
        email: req.body.email
    };
    data_users.push(newUser);
    res.json(newUser);
};

const updateUser = (req, res) => {
    const { id } = req.params;
    
    const user_mod = {
        id: id,
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        birth_date: req.body.birth_date,
        email: req.body.email
    };

    // falta modificar el objeto dentro del array
    const userIndex = data_users.findIndex(data => id === data.id);
    if (userIndex !== -1) {
        data_users[userIndex] = user_mod;
    };

    res.json(user_mod);  
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    const user = data_users.findIndex(data => id === data.id );
    // eliminar objeto de un array
    if (user !== -1) {
        data_users.splice(user, 1);
    };
    
    res.send(`Usuario ID Nro. ${id} eliminado de las base de datos`);
};

module.exports = {
    getAllUsers,       
    getUserById,
    createUser,
    updateUser,
    deleteUser
};