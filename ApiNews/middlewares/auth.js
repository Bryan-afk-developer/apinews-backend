const jwt = require('jsonwebtoken');
// IMPORTANTE: Esta clave debe ser EXACTAMENTE la misma que usaste en UserController.js
const JWT_SECRET = 'tu_super_secreto_para_jwt_12345';

/**
 * Este es un middleware: una función que se ejecuta antes que el controlador final.
 * Su propósito es verificar si la petición incluye un token JWT válido.
 */
const verifyToken = (req, res, next) => {
    // 1. Buscamos el token en la cabecera 'Authorization'
    const authHeader = req.headers['authorization'];

    // Si la cabecera no existe, bloqueamos el acceso
    if (!authHeader) {
        return res.status(403).json({ error: 'Acceso denegado. No se proveyó un token.' });
    }

    // 2. El formato del token es "Bearer <token>". Lo separamos para obtener solo el token.
    const token = authHeader.split(' ')[1];

    // Si después de separar no hay un token, bloqueamos el acceso
    if (!token) {
        return res.status(403).json({ error: 'Formato de token inválido. Debe ser "Bearer [token]".' });
    }

    // 3. Verificamos la validez del token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        // Si hay un error (token expirado, firma inválida, etc.), bloqueamos el acceso
        if (err) {
            return res.status(401).json({ error: 'Token no válido o expirado.' });
        }

        // Si el token es válido, guardamos los datos del usuario (el payload del token)
        // en el objeto 'request' para que el siguiente controlador pueda usarlo si lo necesita.
        req.user = decoded;

        // ¡Todo correcto! Permitimos que la petición continúe hacia el controlador.
        next();
    });
};

module.exports = { verifyToken };

