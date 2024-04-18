import crypto from 'crypto';
import { DateTime } from "luxon"; // Luxon DateTime
const now = DateTime.now(); // Now variable
import logger from '../config/logger.config.js'; //Import the logger

// Generate a random UUID
export function generateUUID() {
    const uuidRandom = crypto.randomUUID();
    // logger for the UUID
    logger.info(`UUID generated: ${uuidRandom} at ${now}`);
    return uuidRandom;
};

// Generate a random Token of a specific length given by a parameter
export function generateToken(bytes) {
    const byteNumber = parseInt(bytes);
    const tokenRandom = crypto.randomBytes(byteNumber).toString('hex');
    // logger for the Token
    logger.info(`Token generated: ${tokenRandom} at ${now}`);
    //Return the Token and the date generated in a JSON
    return {
        token: tokenRandom,
        date: now
    };
};