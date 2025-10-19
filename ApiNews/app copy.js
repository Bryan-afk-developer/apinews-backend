const express = require('express');
const cors = require('cors');
const { connection } = require('./config.db');

// --- 1. IMPORTA TUS MODELOS ---
// (Esto es importante para que Sequelize los conozca al arrancar)
require('./models/ProfileModel');
require('./models/StateModel');
require('./models/CategoryModel');
require('./models/UserModel');
require('./models/NewModel');

const app = express();
// Vercel te dará un puerto, localmente usará el 8000
const PORT = process.env.PORT || 8000; 

// --- 2. MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- 3. RUTAS ---
// Esta es la forma correcta de prefijar tus rutas
try {
    app.use('/api/perfiles', require('./routes/ProfileRoute'));
    app.use('/api/estados', require('./routes/StateRoute'));
    app.use('/api/categorias', require('./routes/CategoryRoute'));
    app.use('/api/usuarios', require('./routes/UserRoute')); 
    app.use('/api/noticias', require('./routes/NewRoute'));
} catch (error) {
    console.error("Error al cargar las rutas:", error.message);
}

// --- 4. ENDPOINT RAÍZ DE PRUEBA ---
// Para verificar que el servidor arrancó en Vercel
app.get('/', (req, res) => {
  res.send('API de Noticias de Bryan - ¡Desplegada y funcionando!');
});

// --- 5. LÓGICA DE ARRANQUE (SOLO PARA LOCAL) ---
async function startServer() {
    try {
        // Sincroniza tu DB local (force: false es seguro)
        await connection.sync({ force: false }); 
        console.log('Modelos locales sincronizados correctamente.');
        
        // Inicia el servidor SOLO en local
        app.listen(PORT, () => {
            console.log(`Servidor local escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al arrancar el servidor local:', error);
    }
}

// Esta condición es la CLAVE:
// 1. Si corres `node app.js` (local), require.main === module es VERDADERO y arranca el servidor.
// 2. Si Vercel "importa" este archivo, es FALSO y solo exporta la app.
if (require.main === module) {
    startServer();
}

// --- 6. EXPORTACIÓN PARA VERCEL ---
// Vercel toma esto y maneja el servidor por su cuenta.
module.exports = app;