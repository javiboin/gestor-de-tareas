const express = require('express');
const router = express.Router();

// creo un array para guardar datos, llevar datos a base de datos
const data_tasks = [
    {
        id: "1", 
        title: "titulo",
        content: "contenido"
    }
];

// traer las operaciones alojadas en el routes tasks.js
const getAllTasks = (req, res) => {
    res.json(data_tasks);
};

const getTaskById = (req, res) => {
    const { id } = req.params;
    const task = data_tasks.find(data => id === data.id);
    res.json(task); 
};

const createTask = (req, res) => {
    const newTask = { 
        id: `${data_tasks.length + 1}`, 
        title: req.body.title,
        content: req.body.content
    };
    data_tasks.push(newTask);
    res.json(newTask);
};

const updateTask = (req, res) => {
    const { id } = req.params;
    
    const task_mod = {
        id: id,
        title: req.body.title,
        content: req.body.content
    };

    // falta modificar el objeto dentro del array
    const taskIndex = data_tasks.findIndex(data => id === data.id);
    if (taskIndex !== -1) {
        data_tasks[taskIndex] = task_mod;
    };

    res.json(task_mod);  
};

const deleteTask = (req, res) => {
    const { id } = req.params;
    const task = data_tasks.findIndex(data => id === data.id );
    // eliminar objeto de un array
    if (task !== -1) {
        data_tasks.splice(task, 1);
    };
    res.send(`Producto ID Nro. ${id} eliminado de las base de datos`);
};

module.exports = {
    getAllTasks,       
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
