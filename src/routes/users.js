const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user');

router.use((req, res, next) => {
    console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
    next();
});  

router.get('/', controllers.getAllUsers); 

router.get('/:id', controllers.getUserById);

router.post('/', controllers.createUser);

router.patch('/:id', controllers.updateUser);

router.delete('/:id', controllers.deleteUser); 

module.exports = router;