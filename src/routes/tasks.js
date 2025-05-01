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

router.use((req, res, next) => {
    console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
    next();
});

router.get('/', (req, res) => {
    res.json(data_tasks);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const task = data_tasks.find(data => id === data.id);
    res.json(task); 
});

router.post('/', (req, res) => {
    const newId = data_tasks.length +1;
    const newTask = { 
        id: newId, 
        title: req.body.title,
        content: req.body.content
    };
    data_tasks.push(newTask);
    res.json(newTask);
});



module.exports = router;