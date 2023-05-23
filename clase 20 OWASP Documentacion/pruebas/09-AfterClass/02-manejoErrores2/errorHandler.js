// Clase para definir errores personalizados
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Listado de errores predefinidos
const errors = {
  notFound: new CustomError('Recurso no encontrado', 404),
  unauthorized: new CustomError('No autorizado', 401),
  // Agrega más errores predefinidos aquí según tus necesidades
};

// Middleware de manejo de errores personalizado
function errorHandler(err, req, res, next) {
  // Verifica si el error es una instancia de CustomError
  if (err instanceof CustomError) {
    // Si es un error predefinido, utiliza su código de estado y mensaje
    res.status(err.statusCode).json({ error: err.message });
  } else {
    // Si no es un error predefinido, utiliza un código de estado genérico y un mensaje genérico
    res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
  }
}

// // Middleware de ejemplo para lanzar un error
// function exampleMiddleware(req, res, next) {
//   try {
//     // Lanza un error de ejemplo predefinido
//     throw errors.notFound;
//   } catch (error) {
//     // Pasa el error al middleware de manejo de errores
//     next(error);
//   }
// }

// Aplicación de ejemplo usando Express.js
const express = require('express');
const app = express();

// Registra el middleware de manejo de errores personalizado
app.use(errorHandler);

throw errors.notFound;

// Puerto en el que se ejecutará el servidor
const port = 3000;

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
