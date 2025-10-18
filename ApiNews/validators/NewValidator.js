const { check } = require('express-validator');
const { Category } = require('../models/CategoryModel');
const { User } = require('../models/UserModel');
const { State } = require('../models/StateModel');

const validatorNewCreate = [
    check('categoria_id').notEmpty().withMessage('El campo categoria_id es obligatorio').isInt().withMessage('El campo categoria_id debe ser un numero entero')
        .custom(value => {
            return Category.findOne({ where: { id: value, activo: true } }).then(item => {
                if (!item) return Promise.reject('No existe una categoría activa con ese ID');
            });
        }),
    check('usuario_id').notEmpty().withMessage('El campo usuario_id es obligatorio').isInt().withMessage('El campo usuario_id debe ser un numero entero')
        .custom(value => {
            return User.findOne({ where: { id: value, activo: true } }).then(item => {
                if (!item) return Promise.reject('No existe un usuario activo con ese ID');
            });
        }),
    check('estado_id').notEmpty().withMessage('El campo estado_id es obligatorio').isInt().withMessage('El campo estado_id debe ser un numero entero')
        .custom(value => {
            return State.findOne({ where: { id: value, activo: true } }).then(item => {
                if (!item) return Promise.reject('No existe un estado activo con ese ID');
            });
        }),
    check('titulo').notEmpty().withMessage('El campo titulo es obligatorio').isLength({ min: 2 }),
    check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio').isLength({ min: 2 }),
    check('imagen').notEmpty().withMessage('El campo imagen es obligatorio').isBase64().withMessage('El campo imagen debe ser Base64'),
    check('activo').optional().isBoolean().withMessage('El campo activo debe ser booleano'),
];

const validatorNewUpdate = [
    check('categoria_id').optional().isInt().withMessage('El campo categoria_id debe ser un numero entero')
        .custom(value => {
            return Category.findOne({ where: { id: value, activo: true } }).then(item => {
                if (!item) return Promise.reject('No existe una categoría activa con ese ID');
            });
        }),
    check('usuario_id').optional().isInt().withMessage('El campo usuario_id debe ser un numero entero')
        .custom(value => {
            return User.findOne({ where: { id: value, activo: true } }).then(item => {
                if (!item) return Promise.reject('No existe un usuario activo con ese ID');
            });
        }),
    check('estado_id').optional().isInt().withMessage('El campo estado_id debe ser un numero entero')
        .custom(value => {
            return State.findOne({ where: { id: value, activo: true } }).then(item => {
                if (!item) return Promise.reject('No existe un estado activo con ese ID');
            });
        }),
    check('titulo').optional().isLength({ min: 2 }),
    check('descripcion').optional().isLength({ min: 2 }),
    check('imagen').optional().isBase64().withMessage('El campo imagen debe ser Base64'),
    check('activo').optional().isBoolean().withMessage('El campo activo debe ser booleano'),
];

module.exports = {
    validatorNewCreate,
    validatorNewUpdate
};