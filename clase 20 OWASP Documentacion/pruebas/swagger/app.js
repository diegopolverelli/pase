const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Configuración de opciones para swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de ejemplo',
      version: '1.0.0',
      description: 'Documentación de la API de ejemplo',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./*.js'], // Rutas de tus archivos de rutas a documentar
};

// Inicializar swagger-jsdoc
const specs = swaggerJsdoc(options);

// Middleware para servir la documentación Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas de ejemplo
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener lista de usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 */
app.get('/api/users', (req, res) => {
  res.json({ message: 'Lista de usuarios' });
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un usuario
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 */
app.post('/api/users', (req, res) => {
  res.json({ message: 'Usuario creado' });
});

// Puerto de escucha
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
