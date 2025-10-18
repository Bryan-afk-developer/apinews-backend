const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");

const Profile = connection.define('profile', {
    id: { // <-- Definimos el ID explícitamente
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

module.exports = { Profile };