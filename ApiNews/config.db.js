const { Sequelize } = require('sequelize');
require('dotenv').config(); // Esta línea es la que falla, pero ya la arreglamos en package.json

const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT, // Asegúrate que Vercel tenga esta variable
        dialect: 'mysql',
        
        // --- Esta es la corrección para el ETIMEDOUT / 500 ---
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false 
          }
        },
        // ------------------------------------------

        logging: false 
    }
);

module.exports = { connection };