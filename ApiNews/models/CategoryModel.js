const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");

const Category = connection.define('category', {
    id: { // <-- Definimos el ID explícitamente
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    descripcion: { type: DataTypes.STRING(255), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
    UserAlta: { type: DataTypes.STRING(20), allowNull: false },
    FechaAlta: { type: DataTypes.DATE, allowNull: false },
    UserMod: { type: DataTypes.STRING(20), allowNull: true },
    FechaMod: { type: DataTypes.DATE, allowNull: true },
    UserBaja: { type: DataTypes.STRING(20), allowNull: true },
    FechaBaja: { type: DataTypes.DATE, allowNull: true }
});

module.exports = { Category };