const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");
const { Profile } = require('./ProfileModel');
const bcrypt = require('bcryptjs'); // Importar bcrypt

const User = connection.define('user', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    perfil_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellidos: { type: DataTypes.STRING(100), allowNull: false },
    nick: { type: DataTypes.STRING(20), allowNull: false },
    correo: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    contraseña: { type: DataTypes.STRING(255), allowNull: false },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    UserAlta: { type: DataTypes.STRING(20), allowNull: false },
    FechaAlta: { type: DataTypes.DATE, allowNull: false },
    UserMod: { type: DataTypes.STRING(20), allowNull: true },
    FechaMod: { type: DataTypes.DATE, allowNull: true },
    UserBaja: { type: DataTypes.STRING(20), allowNull: true },
    FechaBaja: { type: DataTypes.DATE, allowNull: true },
});

// Hook de Sequelize: Se ejecuta automáticamente ANTES de que un usuario sea creado
// y encripta la contraseña.
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.contraseña = await bcrypt.hash(user.contraseña, salt);
});

User.belongsTo(Profile, { as: 'perfil', foreignKey: 'perfil_id' });

module.exports = { User };

