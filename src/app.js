require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const host = 'http://localhost';
const port = process.env.PORT || 3000;
const url = `${host}:${port}`;

const connectDB = require('../src/config/db');
connectDB();

app.use(cors());
app.use(express.json()); // Permite trabajar con JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); // Soporta datos codificados en URL

const { authenticateToken } = require('./middlewares/auth');

// RUTAS
app.get('/', (req, res) => {
    res.send('Hola Usuarios! Buenos dias!');
});

// Rutas de autenticación
const loginRoutes = require('./routes/login');
app.use('/login', loginRoutes);


// Rutas de tareas y usuarios
const tasksRoutes = require('./routes/tasks');
app.use('/tasks', authenticateToken, tasksRoutes);

const usersRoutes = require('./routes/users');
app.use('/users', authenticateToken, usersRoutes);

// iniciar el servidor
app.listen(port, () =>{
    console.log(`Servidor escuchando en ${url}`);
});