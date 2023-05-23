const express = require('express');
const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: './pruebaErrores.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
      )
    }),
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      )
    })

  ]
})

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.fullError = this.stack;
    this.stack = undefined
  }
}

const errors = {
  notFound: new CustomError('Recurso no encontrado', 404),
  unauthorized: new CustomError('No autorizado', 403),
  authenticated: new CustomError('No autenticado',401),
  invalidData: new CustomError('Datos invalidos',400),
  internalError: new CustomError('Error interno delservidor',500)
};

function errorHandler(err, req, res, next) {
  if (err instanceof CustomError) {
    logger.error(err.fullError)
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
  }

}

const app = express();


app.use(errorHandler);

try {
  throw errors.unauthorized;
} catch (error) {
  logger.error(error.fullError)
}

const port = 3000;

app.get('/',(req,res)=>{
  throw errors.unauthorized;
  res.send('ok')
})

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
