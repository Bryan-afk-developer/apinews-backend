const { State } = require('../models/StateModel');
const { validationResult } = require('express-validator');

// --- GET y GET BY ID (sin cambios, pero con logs de error) ---
const get = async (request, response) => {
    try {
        const filters = request.query;
        const entities = await State.findAll({ where: filters });
        response.json(entities);
    } catch (err) {
        console.error("Error al consultar estados:", err);
        response.status(500).send('Error consultando los datos');
    }
};

const getById = async (request, response) => {
    try {
        const id = request.params.id;
        const entitie = await State.findByPk(id);
        if (entitie) {
            response.json(entitie);
        } else {
            response.status(404).send('Recurso no encontrado');
        }
    } catch (err) {
        console.error("Error al consultar estado por ID:", err);
        response.status(500).send('Error al consultar el dato');
    }
};

// --- CREATE (VERSIÓN CORREGIDA CON ASYNC/AWAIT) ---
// En tu archivo StateController.js

const create = async (request, response) => {
    try {
        // 1. Validar la entrada (esto ya lo haces bien)
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.mapped() });
        }

        // 2. Construir el objeto de datos usando el spread operator
        // Esto toma 'nombre' y 'abreviacion' del body y añade solo los campos de alta.
        // Los campos de modificación y baja se dejan como null (o su valor por defecto en la BD).
        const data = {
            ...request.body,
            UserAlta: "Admin", // O el usuario real si lo tienes
            FechaAlta: new Date()
        };

        // 3. Crear el registro
        const newEntitie = await State.create(data);
        response.status(201).json(newEntitie);

    } catch (err) {
        // 4. Capturar cualquier error
        // Si esto falla, el error exacto se mostrará en la consola de tu servidor.
        console.error("ERROR DETALLADO AL CREAR ESTADO:", err);
        response.status(500).send('Error al crear el estado. Revisa la consola del servidor.');
    }
};

// --- UPDATE y DESTROY (Corregidos con async/await) ---
const update = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.mapped() });
        }
        const id = request.params.id;
        const dataToUpdate = { ...request.body, FechaMod: new Date(), UserMod: "Admin" };

        const [numRowsUpdated] = await State.update(dataToUpdate, { where: { id } });

        if (numRowsUpdated > 0) {
            response.status(200).send(`${numRowsUpdated} registro actualizado`);
        } else {
            response.status(404).send('No se encontró el registro para actualizar');
        }
    } catch (err) {
        console.error("Error al actualizar estado:", err);
        response.status(500).send('Error al actualizar');
    }
};

const destroy = async (request, response) => {
    try {
        const id = request.params.id;
        const numRowsDeleted = await State.destroy({ where: { id } });
        if (numRowsDeleted > 0) {
            response.status(200).send(`${numRowsDeleted} registro eliminado`);
        } else {
            response.status(404).send('No se encontró el registro para eliminar');
        }
    } catch (err) {
        console.error("Error al eliminar estado:", err);
        response.status(500).send('Error al eliminar');
    }
};


module.exports = { get, getById, create, update, destroy };