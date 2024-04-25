import jwt from 'jsonwebtoken';
import logger from '../config/logger.config.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        logger.error('No se encontró el token de autenticación');
        return res.status(403).json({ error: 'Se requiere un token para la autenticación' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            logger.error('Token no válido o expirado');
            return res.status(401).json({ error: 'Token no válido o expirado' });
        }

        req.user = decoded;
        logger.info('Token válido');
        next();
    });
};