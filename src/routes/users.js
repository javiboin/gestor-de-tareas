const e = require('express');
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

router.use((req, res, next) => {
    console.log(`Request method: ${req.method}, Request URL: ${req.originalUrl}`);
    next();
});  

router.get('/', (req, res) => {
    res.json(data_users);
});  

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = data_users.find(data => id === data.id);
    res.json(user); 
});

router.post('/', (req, res) => {
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
});

router.patch('/:id', (req, res) => {
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
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    // encontrar el dato dentro del arreglo
    const user = data_users.findIndex(data => id === data.id );
    // eliminar objeto de un array
    if (user !== -1) {
        data_users.splice(user, 1);
    };
    
    res.send(`Producto ID Nro. ${id} eliminado de las base de datos`);
});  

module.exports = router;