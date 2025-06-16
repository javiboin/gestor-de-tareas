const { generateToken } = require('../middlewares/auth');
const { verifyPassword } = require('../controllers/encoder');
const userModel = require('../models/users');

const login = async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        };
        
        const passwordMatch = await verifyPassword(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        };

        const token = generateToken(user);
        if (!token) {
            return res.status(500).json({ message: 'Error al generar el token' });
        };

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    };
};

module.exports = { login };