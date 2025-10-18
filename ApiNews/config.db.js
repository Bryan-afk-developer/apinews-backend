const { Sequelize } = require('sequelize');
require('dotenv').config(); // <-- Importante: Carga las variables de .env

const connection = new Sequelize(
    process.env.DB_NAME,     // <-- Lee el nombre de la BD desde .env
    process.env.DB_USER,     // <-- Lee el usuario desde .env
    process.env.DB_PASSWORD, // <-- Lee la contraseña desde .env
    {
        host: process.env.DB_HOST, // <-- Lee el host desde .env
        dialect: 'mysql',
        logging: false // Opcional: para no mostrar logs de SQL en la consola
    }
);

module.exports = { connection };
