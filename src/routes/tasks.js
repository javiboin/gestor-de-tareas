const express = require('express');
const router = express.Router();
const controllers = require('../controllers/task');

// Esto lo puedo mover al app.js
router.use((req, res, next) => {
    console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
    next();
});

router
    .get('/', controllers.getAllTasks)
    .get('/:id', controllers.getTaskById)
    .post('/', controllers.createTask)
    .patch('/:id', controllers.updateTask)
    .delete('/:id', controllers.deleteTask);

module.exports = router;