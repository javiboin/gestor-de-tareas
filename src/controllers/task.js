const express = require('express');
const router = express.Router();

// crear Seeders para tener datos de prueba
const data_tasks = [
    {
        id: "1", 
        title: "titulo",
        content: "contenido"
    }
];

const getAllTasks = (req, res) => {
    try {
        res.status(200).json(data_tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    };
};

const getTaskById = (req, res) => {
    try {
        const { id } = req.params;
        const task = data_tasks.find(data => id === data.id);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la tarea' });
    };
};

const createTask = (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: 'Faltan datos para crear la tarea' });
        };
        const existingTask = data_tasks.find(data => data.title === req.body.title);
        if (existingTask) {
            return res.status(400).json({ message: 'Ya existe una tarea con ese título' });
        };
        if (req.body.title.length < 5) {
            return res.status(400).json({ message: 'El título debe tener al menos 5 caracteres' });
        };
        if (req.body.content.length < 10) {
            return res.status(400).json({ message: 'El contenido debe tener al menos 10 caracteres' });
        };
        if (req.body.title.length > 50) {
            return res.status(400).json({ message: 'El título no puede tener más de 50 caracteres' });
        };
        if (req.body.content.length > 200) {
            return res.status(400).json({ message: 'El contenido no puede tener más de 200 caracteres' });
        };
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la tarea' });
    };

    const newTask = { 
        id: `${data_tasks.length + 1}`, 
        title: req.body.title,
        content: req.body.content
    };
    data_tasks.push(newTask);
    res.status(200).json(newTask);
};

const updateTask = (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: 'Faltan datos para modificar la tarea' });
        };
        if (req.body.title.length < 5) {
            return res.status(400).json({ message: 'El título debe tener al menos 5 caracteres' });
        };
        if (req.body.content.length < 10) {
            return res.status(400).json({ message: 'El contenido debe tener al menos 10 caracteres' });
        };
        if (req.body.title.length > 50) {
            return res.status(400).json({ message: 'El título no puede tener más de 50 caracteres' });
        };
        if (req.body.content.length > 200) {
            return res.status(400).json({ message: 'El contenido no puede tener más de 200 caracteres' });
        };
    } catch (error) {
        return res.status(500).json({ message: 'Error al modificar la tarea' });
    };

    const { id } = req.params;
    
    const task_mod = {
        id: id,
        title: req.body.title,
        content: req.body.content
    };

    const taskIndex = data_tasks.findIndex(data => id === data.id);
    if (taskIndex !== -1) {
        data_tasks[taskIndex] = task_mod;
    };
 
    res.status(200).json(task_mod);
};

const deleteTask = (req, res) => {
    try {
        const { id } = req.params;

        const index = data_tasks.findIndex(data => id === data.id);
        if (index === -1) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        };

        data_tasks.splice(index, 1);
        res.status(200).json( { message: `Producto ID Nro. ${id} eliminado de las base de datos` } ); 
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la tarea' });
    };
};

module.exports = {
    getAllTasks,       
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
