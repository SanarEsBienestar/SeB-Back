import winston from 'winston';

// Define the log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  })
);

// Create the logger
const logger = winston.createLogger({
  level: 'info', // Set the log level (e.g., 'info', 'debug', 'error')
  format: logFormat,
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ 
      filename: './logs/server.log', // Log to a file named 'server.log'
      maxsize: 1048576, // Max size of 1MB
      maxFiles: 3, // Max 3 files
      tailable: true // Automatically remove older files
    }) 
  ]
});

export default logger;