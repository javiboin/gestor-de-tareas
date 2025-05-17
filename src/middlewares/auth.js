const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

module.exports = {
    generateToken,
    authenticateToken
};
