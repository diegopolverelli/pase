const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  // Obtén el número de núcleos del sistema
  const numCPUs = os.cpus().length;

  // Crea un proceso por cada núcleo del sistema
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Maneja la muerte de los procesos hijos y crea nuevos si es necesario
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Proceso hijo ${worker.process.pid} terminado`);
    cluster.fork();
  });
} else {
  // Lógica de la aplicación Express
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hola desde el proceso hijo '+process.pid);
  });

  app.listen(3000, () => {
    console.log(`Proceso hijo ${process.pid} escuchando en el puerto 3000`);
  });
}
