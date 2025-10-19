const { Sequelize } = require('sequelize');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const isProduction = process.env.NODE_ENV === 'production';

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: isProduction
      ? { ssl: { require: true, rejectUnauthorized: false } } // solo usa SSL en producción
      : {}, // nada de SSL localmente
    logging: false,
  }
);

module.exports = { connection };
