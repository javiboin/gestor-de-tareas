require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const host = 'http://localhost';
const port = process.env.PORT || 3000;
const url = `${host}:${port}`;

app.use(cors());
app.use(express.json()); // Permite trabajar con JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); // Soporta datos codificados en URL

// RUTAS
app.get('/', (req, res) => {
    res.send('Hola Usuarios! Buenos dias!');
})

app.listen(port, () =>{
    console.log(`Servidor escuchando en ${url}`);
});