const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user');

router.use((req, res, next) => {
    console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
    next();
});  

router
    .get('/', controllers.getAllUsers)
    .get('/:id', controllers.getUserById)
    .post('/', controllers.createUser)
    .patch('/:id', controllers.updateUser)
    .delete('/:id', controllers.deleteUser); 

module.exports = router;