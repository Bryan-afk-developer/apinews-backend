const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");

const State = connection.define('state', {
    id: { // <-- Definimos el ID explícitamente
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    abreviacion: { type: DataTypes.STRING(5), allowNull: false, unique: true },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    UserAlta: { type: DataTypes.STRING(30), allowNull: false },
    FechaAlta: { type: DataTypes.DATE, allowNull: false },
    UserMod: { type: DataTypes.STRING(30), allowNull: true },
    FechaMod: { type: DataTypes.DATE, allowNull: true },
    UserBaja: { type: DataTypes.STRING(30), allowNull: true },
    FechaBaja: { type: DataTypes.DATE, allowNull: true },
});

module.exports = { State };