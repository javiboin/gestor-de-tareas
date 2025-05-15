const TaskModel = require('../models/tasks');

// crear Seeders para tener datos de prueba
const data_tasks = [
];

const getAllTasks = (req, res) => {
    TaskModel.find()
        .then(tasks => {
            if (tasks.length === 0) {
                return res.status(404).json({ message: 'No hay tareas disponibles' });
            }
            res.status(200).json(tasks);
        })
        .catch(err => {
            console.error('Error al obtener las tareas de la base de datos:', err);
            res.status(500).json({ message: 'Error al obtener las tareas de la base de datos' });
        });
};

const getTaskById = (req, res) => {
    TaskModel.findById(req.params.id)
        .then(task => {
            if (!task) {
                return res.status(404).json({ message: 'Tarea no encontrada' });
            }
            res.status(200).json(task);
        })
        .catch(err => {
            console.error('Error al obtener la tarea de la base de datos:', err);
            res.status(500).json({ message: 'Error al obtener la tarea de la base de datos' });
        });
};

const createTask = (req, res) => {
   try {
         if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: 'Faltan datos para crear la tarea' });
        };
        if (req.body.title === '' || req.body.content === '') {
            return res.status(400).json({ message: 'El título y el contenido no pueden estar vacíos' });
        }; 

        const taskTitle = req.body.title;  
        const taskExists = TaskModel.findOne({ title: taskTitle });
        if (taskExists) {
            return res.status(400).json({ message: 'Ya existe una tarea con ese título' });
        };
 
        if (req.body.title.length < 5) {
            return res.status(400).json({ message: 'El título debe tener al menos 5 caracteres' });
        };
        if (req.body.content.length < 10) {
            return res.status(400).json({ message: 'El contenido debe tener al menos 10 caracteres' });
        };
        if (req.body.title.length > 50) {
            return res.status(400).json({ message: 'El título no puede tener más de 50 caracteres' });
        };
        if (req.body.content.length > 200) {
            return res.status(400).json({ message: 'El contenido no puede tener más de 200 caracteres' });
        };
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la TAREA' });
    }; 

    const newTask = { 
        title: req.body.title,
        content: req.body.content
    };

    const task = new TaskModel(newTask);
    task.save()
        .then(() => console.log('Tarea guardada en la base de datos'))
        .catch(err => console.error('Error al guardar la tarea en la base de datos:', err));

    res.status(200).json(newTask);
};

const updateTask = (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: 'Faltan datos para modificar la tarea' });
        };
        if (req.body.title.length < 5) {
            return res.status(400).json({ message: 'El título debe tener al menos 5 caracteres' });
        };
        if (req.body.content.length < 10) {
            return res.status(400).json({ message: 'El contenido debe tener al menos 10 caracteres' });
        };
        if (req.body.title.length > 50) {
            return res.status(400).json({ message: 'El título no puede tener más de 50 caracteres' });
        };
        if (req.body.content.length > 200) {
            return res.status(400).json({ message: 'El contenido no puede tener más de 200 caracteres' });
        };
        if (req.body.title === '' || req.body.content === '') {
            return res.status(400).json({ message: 'El título y el contenido no pueden estar vacíos' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al modificar la tarea' });
    };

    const { id } = req.params;   
    const task_mod = {
        id: id,
        title: req.body.title,
        content: req.body.content
    };

    TaskModel
        .updateOne({ _id: id }, { $set: task_mod })
        .then(() => console.log('Tarea modificada en la base de datos'))
        .catch(err => console.error('Error al modificar la tarea en la base de datos:', err));
 
    res.status(200).json(task_mod);
};

const deleteTask = (req, res) => {
    try {
        const { id } = req.params;

        const index = data_tasks.findIndex(data => id === data.id);
        if (index === -1) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        };

        data_tasks.splice(index, 1);
        res.status(200).json( { message: `Producto ID Nro. ${id} eliminado de las base de datos` } ); 
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la tarea' });
    };
};

module.exports = {
    getAllTasks,       
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
