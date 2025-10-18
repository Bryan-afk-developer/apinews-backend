const { Profile } = require('../models/ProfileModel');

const get = (request, response) => {
  Profile.findAll()
    .then(entities => {
      response.json(entities);
    })
    .catch(err => {
      console.error("Error al consultar perfiles:", err);
      response.status(500).send('Error consultando los datos');
    });
};

const getById = (request, response) => {
  const id = request.params.id;
  Profile.findByPk(id)
    .then(entitie => {
      if (entitie) {
        response.json(entitie);
      } else {
        response.status(404).send('Recurso no encontrado');
      }
    })
    .catch(err => {
      console.error("Error al consultar perfil por ID:", err);
      response.status(500).send('Error al consultar el dato');
    });
};

module.exports = { get, getById };