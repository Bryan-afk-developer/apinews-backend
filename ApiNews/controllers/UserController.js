const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Tu clave secreta para firmar los tokens. ¡Debe ser secreta y estar segura!
const JWT_SECRET = 'tu_super_secreto_para_jwt_12345';

const relations = [
    { model: Profile, attributes: ['id', 'nombre'], as: 'perfil' }
];

const get = async (request, response) => {
    try {
        const filters = request.query;
        const entities = await User.findAll({ where: filters, include: relations });
        response.json(entities);
    } catch (err) {
        console.error("Error al consultar usuarios:", err);
        response.status(500).send('Error consultando los datos');
    }
};

const getById = async (request, response) => {
    try {
        const id = request.params.id;
        const entitie = await User.findByPk(id, { include: relations });
        if (entitie) {
            response.json(entitie);
        } else {
            response.status(404).send('Recurso no encontrado');
        }
    } catch (err) {
        console.error("Error al consultar usuario por ID:", err);
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
            UserAlta: "Admin",
            FechaAlta: new Date()
        };
        const newEntitie = await User.create(data);
        response.status(201).json(newEntitie);
    } catch (err) {
        console.error("ERROR DETALLADO AL CREAR USUARIO:", err);
        response.status(500).send('Error al crear el usuario. Revisa la consola del servidor.');
    }
};

const login = async (request, response) => {
    try {
        const { correo, contraseña } = request.body;

        // 1. Buscar al usuario
        const user = await User.findOne({ where: { correo: correo } });

        // 2. ¡LA CLAVE ESTÁ AQUÍ! Si el usuario no existe, nos detenemos.
        // Esto previene el error 'cannot read properties of undefined'.
        if (!user) {
            return response.status(401).json({ error: 'Usuario no encontrado o credenciales inválidas.' });
        }

        // 3. Comparar la contraseña
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return response.status(401).json({ error: 'Usuario no encontrado o credenciales inválidas.' });
        }

        // 4. Si todo es correcto, crear y firmar el token
        const payload = {
            id: user.id,
            nombre: user.nombre,
            perfil_id: user.perfil_id
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        response.json({
            message: 'Login exitoso!',
            token: token
        });

    } catch (error) {
        console.error("Error en el login:", error);
        response.status(500).json({ error: 'Error interno del servidor' });
    }
};

const update = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.mapped() });
        }
        const id = request.params.id;
        const [numRowsUpdated] = await User.update(request.body, { where: { id: id } });
        if (numRowsUpdated > 0) {
            response.status(200).send(`${numRowsUpdated} registro actualizado`);
        } else {
            response.status(404).send('No se encontró el registro para actualizar');
        }
    } catch (err) {
        console.error("Error al actualizar usuario:", err);
        response.status(500).send('Error al actualizar');
    }
};

const destroy = async (request, response) => {
    try {
        const id = request.params.id;
        const numRowsDeleted = await User.destroy({ where: { id: id } });
        if (numRowsDeleted > 0) {
            response.status(200).send(`${numRowsDeleted} registro eliminado`);
        } else {
            response.status(404).send('No se encontró el registro para eliminar');
        }
    } catch (err) {
        console.error("Error al eliminar usuario:", err);
        response.status(500).send('Error al eliminar');
    }
};

module.exports = { get, getById, create, update, destroy, login };

