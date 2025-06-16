const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
        throw error;
    }
};

const verifyPassword = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (error) {
        console.error('Error al verificar la contraseña:', error);
        throw error;
    }
};

module.exports = { hashPassword, verifyPassword };