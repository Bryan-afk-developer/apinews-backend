const { Category } = require('../models/CategoryModel');
const { validationResult } = require('express-validator');

const get = async (request, response) => {
  try {
    const filters = request.query;
    const entities = await Category.findAll({ where: filters });
    response.json(entities);
  } catch (err) {
    console.error("Error al consultar categorías:", err);
    response.status(500).send('Error consultando los datos');
  }
};

const getById = async (request, response) => {
  try {
    const id = request.params.id;
    const entitie = await Category.findByPk(id);
    if (entitie) {
      response.json(entitie);
    } else {
      response.status(404).send('Recurso no encontrado');
    }
  } catch (err) {
    console.error("Error al consultar categoría por ID:", err);
    response.status(500).send('Error al consultar el dato');
  }
};

const create = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.mapped() });
    }
    const data = {
      ...request.body,
      UserAlta: "Admin", // O podrías usar req.user.id del token
      FechaAlta: new Date()
    };
    const newEntitie = await Category.create(data);
    response.status(201).json(newEntitie);
  } catch (err) {
    console.error("ERROR DETALLADO AL CREAR CATEGORÍA:", err);
    response.status(500).send('Error al crear la categoría. Revisa la consola.');
  }
};

const update = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.mapped() });
    }
    const id = request.params.id;
    const [numRowsUpdated] = await Category.update(request.body, { where: { id: id } });
    if (numRowsUpdated > 0) {
      response.status(200).send(`${numRowsUpdated} registro actualizado`);
    } else {
      response.status(404).send('No se encontró el registro para actualizar');
    }
  } catch (err) {
    console.error("Error al actualizar categoría:", err);
    response.status(500).send('Error al actualizar');
  }
};

const destroy = async (request, response) => {
  try {
    const id = request.params.id;
    const numRowsDeleted = await Category.destroy({ where: { id: id } });
    if (numRowsDeleted > 0) {
      response.status(200).send(`${numRowsDeleted} registro eliminado`);
    } else {
      response.status(404).send('No se encontró el registro para eliminar');
    }
  } catch (err) {
    console.error("Error al eliminar categoría:", err);
    response.status(500).send('Error al eliminar');
  }
};

module.exports = { get, getById, create, update, destroy };
