const { Sequelize } = require('sequelize');
require('dotenv').config(); // <-- Carga las variables de .env

const connection = new Sequelize(
    process.env.DB_NAME,     // Nombre de la BD
    process.env.DB_USER,     // Usuario
    process.env.DB_PASSWORD, // Contraseña
    {
        host: process.env.DB_HOST, // Host de Railway
        port: process.env.DB_PORT, // Puerto de Railway (MUY IMPORTANTE)
        dialect: 'mysql',
        
        // --- ESTA ES LA CORRECCIÓN PARA EL ETIMEDOUT ---
        dialectOptions: {
          ssl: {
            require: true,
            // Esto es necesario para proxies de DB como el de Railway
            rejectUnauthorized: false 
          }
        },
        // ------------------------------------------

        logging: false // Para no mostrar logs de SQL
    }
);

module.exports = { connection };