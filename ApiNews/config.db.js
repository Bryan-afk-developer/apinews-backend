const { Sequelize } = require('sequelize');

// --- ¡ESTA ES LA CORRECCIÓN CLAVE! ---
// Le decimos a Node.js que solo intente usar 'dotenv'
// si NO estamos en el entorno de 'production' (como Vercel).
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// ------------------------------------

const connection = new Sequelize(
    process.env.DB_NAME,     // Vercel/Railway los provee
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT, // Vercel/Railway los provee
        dialect: 'mysql',
        
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false 
          }
        },
        logging: false 
    }
);

module.exports = { connection };