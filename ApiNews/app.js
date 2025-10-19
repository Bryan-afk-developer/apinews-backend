const express = require('express');
const cors = require('cors');
const { connection } = require('./config.db');

// Importa los modelos
require('./models/ProfileModel');
require('./models/StateModel');
require('./models/CategoryModel');
require('./models/UserModel');
require('./models/NewModel');

const app = express();
const PORT = process.env.PORT || 8000; 

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
try {
    app.use('/api/perfiles', require('./routes/ProfileRoute'));
    app.use('/api/estados', require('./routes/StateRoute'));
    app.use('/api/categorias', require('./routes/CategoryRoute'));
    app.use('/api/usuarios', require('./routes/UserRoute')); 
    app.use('/api/noticias', require('./routes/NewRoute'));
} catch (error) {
    console.error("Error al cargar las rutas:", error.message);
}

// Endpoint raíz de prueba
app.get('/', (req, res) => {
  res.send('API de Noticias de Bryan - ¡Desplegada y funcionando!');
});

// --- LÓGICA DE ARRANQUE (SOLO PARA LOCAL) ---
if (require.main === module) {
    connection.sync({ force: false })
        .then(() => {
            console.log('Modelos locales sincronizados.');
            app.listen(PORT, () => {
                console.log(`Servidor local escuchando en el puerto ${PORT}`);
            });
        })
        .catch(error => {
            console.error('Error al arrancar el servidor local:', error);
        });
}

// --- EXPORTACIÓN PARA VERCEL ---
module.exports = app;