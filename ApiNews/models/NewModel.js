const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");
const { Category } = require('./CategoryModel');
const { State } = require('./StateModel');
const { User } = require('./UserModel');

const New = connection.define('new', {
    id: { // <-- Definimos el ID explícitamente
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    categoria_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false }, // Mismo tipo
    estado_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },    // Mismo tipo
    usuario_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },     // Mismo tipo
    titulo: { type: DataTypes.STRING(50), allowNull: false },
    fecha_publicacion: { type: DataTypes.DATE, allowNull: false },
    descripcion: { type: DataTypes.STRING(1000), allowNull: false },
    imagen: { type: DataTypes.TEXT('medium'), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    UserAlta: { type: DataTypes.STRING(20), allowNull: false },
    FechaAlta: { type: DataTypes.DATE, allowNull: false },
    UserMod: { type: DataTypes.STRING(20), allowNull: true },
    FechaMod: { type: DataTypes.DATE, allowNull: true },
    UserBaja: { type: DataTypes.STRING(20), allowNull: true },
    FechaBaja: { type: DataTypes.DATE, allowNull: true },
});

New.belongsTo(Category, { as: 'categoria', foreignKey: 'categoria_id' });
New.belongsTo(State, { as: 'estado', foreignKey: 'estado_id' });
New.belongsTo(User, { as: 'usuario', foreignKey: 'usuario_id' });

module.exports = { New };