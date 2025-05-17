const { generateToken } = require('../middlewares/auth');
const userModel = require('../models/users');

const login = (req, res) => {
    userModel.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            };

            const token = generateToken(user);
            if (!token) {
                return res.status(500).json({ message: 'Error al generar el token' });
            };
            return res.status(200).json({ token });
        })
        .catch(err => {
            console.error('Error al buscar el usuario en la base de datos:', err);
            return res.status(500).json({ message: 'Error al procesar la solicitud' });
        }); 
};

module.exports = { login };