const { check } = require('express-validator');
const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');

const validatorUserCreate = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio').isLength({ min: 2, max: 100 }),
    check('apellidos').notEmpty().withMessage('El campo apellidos es obligatorio').isLength({ min: 2, max: 100 }),
    check('nick').notEmpty().withMessage('El campo nick es obligatorio').isLength({ min: 2, max: 20 }),
    check('correo').notEmpty().withMessage('El campo correo es obligatorio').isEmail().withMessage('Debe ser un correo válido')
        .custom(value => {
            return User.findOne({ where: { correo: value } }).then(user => {
                if (user) {
                    return Promise.reject('Ya existe un usuario con el mismo correo');
                }
            });
        }),
    check('contraseña').notEmpty().withMessage('El campo contraseña es obligatorio').isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres'),
    check('perfil_id').notEmpty().withMessage('El campo perfil_id es obligatorio').isInt().withMessage('El campo perfil_id debe ser un número entero')
        .custom(value => {
            return Profile.findByPk(value).then(profile => {
                if (!profile) {
                    return Promise.reject('No existe un perfil con ese ID');
                }
            });
        }),
];

const validatorUserUpdate = [
    check('nombre').optional().isLength({ min: 2, max: 100 }),
    check('apellidos').optional().isLength({ min: 2, max: 100 }),
    check('nick').optional().isLength({ min: 2, max: 20 }),
    check('contraseña').optional().isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres'),
    check('perfil_id').optional().isInt().withMessage('El campo perfil_id debe ser un número entero')
        .custom(value => {
            return Profile.findByPk(value).then(profile => {
                if (!profile) {
                    return Promise.reject('No existe un perfil con ese ID');
                }
            });
        }),
];

module.exports = {
    validatorUserCreate,
    validatorUserUpdate
};