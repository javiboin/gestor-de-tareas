const express = require('express');
const router = express.Router();
const controllers = require('../controllers/task');

// Esto lo puedo mover al app.js
router.use((req, res, next) => {
    console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
    next();
});

router.get('/', controllers.getAllTasks);

router.get('/:id', controllers.getTaskById);

router.post('/', controllers.createTask);

router.patch('/:id', controllers.updateTask);

router.delete('/:id', controllers.deleteTask);

module.exports = router;