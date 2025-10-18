const express = require('express');
const { get, getById, create, update, destroy } = require('../controllers/NewController');
const { validatorNewCreate, validatorNewUpdate } = require('../validators/NewValidator');
const { verifyToken } = require('../middlewares/auth'); // <-- Importar el guardián

const api = express.Router();

// --- Rutas Públicas ---
api.get('/noticias', get);
api.get('/noticias/:id', getById);

// --- Rutas Protegidas ---
api.post('/noticias', verifyToken, validatorNewCreate, create);
api.put('/noticias/:id', verifyToken, validatorNewUpdate, update);
api.delete('/noticias/:id', verifyToken, destroy);

module.exports = api;
