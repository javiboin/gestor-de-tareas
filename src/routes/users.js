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
    const user = data_tasks.find(data => id === data.id);
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

module.exports = router;