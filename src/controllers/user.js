const userModel = require('../models/users');

const data_users = [
/*     {
        id: "1",
        username: "user1",
        password: "password1",
        name: "User One",
        birth_date: "1990-01-01",
        email: "user1@gmail.com"
    } */
];

const getAllUsers = (req, res) => {
    userModel.find()
            .then(users => {
                if (users.length === 0) {
                    return res.status(404).json({ message: 'No hay usuarios disponibles' });
                }
                res.status(200).json(users);
            })
            .catch(err => {
                console.error('Error al obtener los usuarios de la base de datos:', err);
                res.status(500).json({ message: 'Error al obtener las tareas de la base de datos' });
            });
};

const getUserById = (req, res) => {
    userModel.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.error('Error al obtener el usuario de la base de datos:', err);
            res.status(500).json({ message: 'Error al obtener el usuario de la base de datos' });
        });
};

const createUser = (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.name || !req.body.birth_date || !req.body.email) {
            return res.status(400).json({ message: 'Faltan datos para crear el usuario' });
        };
        if (req.body.username === '' || req.body.password === '' || req.body.name === '' || req.body.birth_date === '' || req.body.email === '') {
            return res.status(400).json({ message: 'El nombre de usuario, la contraseña, el nombre, la fecha de nacimiento y el correo electrónico no pueden estar vacíos' });  
        };
        if (req.body.username.length < 5) {
            return res.status(400).json({ message: 'El nombre de usuario debe tener al menos 5 caracteres' });
        };
        if (req.body.password.length < 8) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
        };

        const username = req.body.username;
        userModel.findOne({ username: username })
            .then(userExists => {
                if (userExists) {
                    return res.status(400).json({ message: 'Ya existe un usuario con ese nombre de usuario' });
                };

                const newUser = { 
                    username: req.body.username,
                    password: req.body.password,
                    name: req.body.name,
                    birth_date: req.body.birth_date,
                    email: req.body.email
                };

                const user = new userModel(newUser);
                user.save()
                    .then(() => res.status(200).send({ message: 'Usuario creado correctamente' }))
                    .catch(err => console.error('Error al guardar el usuario en la base de datos:', err));
            })
            .catch(err => {
                console.error('Error al verificar el nombre de usuario:', err);
                return res.status(500).json({ message: 'Error al verificar el nombre de usuario' });
            });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el usuario' });
    };
};

const updateUser = (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.name || !req.body.birth_date || !req.body.email) {
            return res.status(400).json({ message: 'Faltan datos para modificar el usuario' });
        };
        if (req.body.username.length < 5) {
            return res.status(400).json({ message: 'El nombre de usuario debe tener al menos 5 caracteres' });
        };
        if (req.body.password.length < 8) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
        };
    }  catch (error) {
        return res.status(500).json({ message: 'Error al modificar el usuario' });
    };

    const { id } = req.params;
    
    const user_mod = {
        id: id,
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        birth_date: req.body.birth_date,
        email: req.body.email
    };

    const userIndex = data_users.findIndex(data => id === data.id);
    if (userIndex !== -1) {
        data_users[userIndex] = user_mod;
    }; 

    res.status(200).json(user_mod);
};

const deleteUser = (req, res) => {
    try {
        const { id } = req.params;

        const index = data_users.findIndex(data => id === data.id );
        if (index === -1) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        };

        data_users.splice(index, 1);
        res.status(200).json( { message: `Usuario ID Nro. ${id} eliminado de las base de datos` } );
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el usuario' });
    };
};

module.exports = {
    getAllUsers,       
    getUserById,
    createUser,
    updateUser,
    deleteUser
};