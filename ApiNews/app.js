const express = require('express');
const cors = require('cors');
const { connection } = require('./config.db');

// Importa todos tus modelos
require('./models/ProfileModel');
require('./models/StateModel');
require('./models/CategoryModel');
require('./models/UserModel');
require('./models/NewModel');

const app = express();
const PORT = 8000; // O el puerto que estés usando

// Middlewares
app.use(cors());
app.use(express.json());

// Importación de Rutas
const profile_routes = require('./routes/ProfileRoute');
const state_routes = require('./routes/StateRoute');
const category_routes = require('./routes/CategoryRoute');
const user_routes = require('./routes/UserRoute'); // <-- Asegúrate de que esta línea exista
const new_routes = require('./routes/NewRoute');

// Uso de Rutas con prefijo global
app.use('/api', profile_routes);
app.use('/api', state_routes);
app.use('/api', category_routes);
app.use('/api', user_routes); // <-- Y que esta también exista
app.use('/api', new_routes);

// ... el resto de tu código para iniciar el servidor ...
async function startServer() {
    try {
        await connection.sync({ force: false });
        console.log('Todos los modelos se han sincronizado correctamente.');
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al sincronizar con la base de datos:', error);
    }
}

startServer();

module.exports = app;
