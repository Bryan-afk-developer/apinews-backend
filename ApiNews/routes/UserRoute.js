var express = require('express');
const { get, getById, create, update, destroy, login } = require('../controllers/UserController');
const { validatorUserCreate, validatorUserUpdate } = require('../validators/UserValidator');
const api = express.Router();

// --- RUTA DE LOGIN (Específica) ---
// La ponemos primero para evitar que Express la confunda con /:id
api.post('/usuarios/login', login);


// --- Rutas CRUD de Usuarios (Generales) ---
api.get('/usuarios', get);
api.get('/usuarios/:id', getById);
api.post('/usuarios', validatorUserCreate, create); // <-- ESTA ES LA LÍNEA QUE DEFINE TU RUTA
api.put('/usuarios/:id', validatorUserUpdate, update);
api.delete('/usuarios/:id', destroy);


module.exports = api;

