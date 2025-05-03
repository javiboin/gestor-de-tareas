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

module.exports = router;