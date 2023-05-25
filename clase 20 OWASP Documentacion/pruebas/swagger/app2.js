const swaggerJsdoc = require('swagger-jsdoc');
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');


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
  apis: ['./*.js','./components/schemas/*.yaml'], // Rutas de tus archivos de rutas a documentar
};

// Inicializar swagger-jsdoc
const specs = swaggerJsdoc(options);

// Middleware para servir la documentación Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener lista de usuarios
 *     description: Retorna una lista de todos los usuarios registrados en el sistema
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página para la paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad máxima de usuarios por página
 *     responses:
 *       '200':
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *         examples:
 *           application/json:
 *             [
 *               {
 *                 "id": 1,
 *                 "name": "John Doe",
 *                 "email": "john@example.com"
 *               },
 *               {
 *                 "id": 2,
 *                 "name": "Jane Smith",
 *                 "email": "jane@example.com"
 *               }
 *             ]
 *     security:
 *       - Authorization: []
 *   post:
 *     summary: Crear un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: John Doe
 *             email: john@example.com
 *     responses:
 *       '200':
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * /api/users2:
 *   get:
 *     summary: Obtener lista de usuarios
 *     description: Retorna una lista de todos los usuarios registrados en el sistema
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página para la paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad máxima de usuarios por página
 *     responses:
 *       '200':
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *         examples:
 *           application/json:
 *             [
 *               {
 *                 "id": 1,
 *                 "name": "John Doe",
 *                 "email": "john@example.com"
 *               },
 *               {
 *                 "id": 2,
 *                 "name": "Jane Smith",
 *                 "email": "jane@example.com"
 *               }
 *             ]
 *     security:
 *       - apiKey: []

*/


// Obtener lista de usuarios
app.get('/api/users', (req, res) => {
  // Lógica para obtener la lista de usuarios
  res.json([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com'
    }
  ]);
});

// Crear un usuario
app.post('/api/users', (req, res) => {
  // Lógica para crear un usuario
  const user = req.body;
  // ...
  res.json(user);
});

// Puerto de escucha
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
