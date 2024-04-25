import logger from "../config/logger.config.js";

export const requestData = (req, res, next) => {
    // Obtiene la IP del cliente, considerando si la solicitud pasa por un proxy
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    // Registra la URL de la solicitud y la IP del cliente
    logger.info(`Request to ${req.originalUrl} from IP: ${clientIp}`);
    
    next();
}
