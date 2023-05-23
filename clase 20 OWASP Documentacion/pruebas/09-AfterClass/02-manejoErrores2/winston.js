const winston = require('winston');

// Configurar el transportador de archivo
const logger = winston.createLogger({
  level: 'info', // Nivel mínimo de los registros a escribir
  format: winston.format.json(), // Formato de los registros
  transports: [
    new winston.transports.File({ filename: 'registros.log' }) // Archivo donde se escribirán los registros
  ]
});

// Registrar un mensaje
logger.info('Este es un mensaje de registro.');

// Registrar un mensaje de error
logger.error('Ocurrió un error en la aplicación.');

// Registrar un mensaje de advertencia
logger.warn('Esto es una advertencia.');

// Registrar un mensaje de depuración
logger.debug('Esto es un mensaje de depuración.');
