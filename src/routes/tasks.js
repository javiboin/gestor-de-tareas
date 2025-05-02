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
    const newTask = { 
        id: `${data_tasks.length + 1}`, 
        title: req.body.title,
        content: req.body.content
    };
    data_tasks.push(newTask);
    res.json(newTask);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    // encontrar el dato dentro del arreglo
    const task = data_tasks.findIndex(data => id === data.id );
    // eliminar objeto de un array
    if (task !== -1) {
        data_tasks.splice(task, 1);
    };
    res.send(`Producto ID Nro. ${id} eliminado de las base de datos`);
})

module.exports = router;