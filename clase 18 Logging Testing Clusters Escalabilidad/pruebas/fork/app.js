import cluster from 'cluster'
import { cpus } from 'os'
import express from 'express'
import { workerData } from 'worker_threads'

const numeroDeProcesadores = cpus().length
console.log(`Numero de procesadores: ${numeroDeProcesadores}`)

if (cluster.isPrimary) {
    console.log('Proceso primario generando proceso worker')
    for (let i = 0; i < numeroDeProcesadores; i++) {
        cluster.fork()
    }
} else {
    console.log(`Proceso worker, con pid ${process.pid}`)

    const app = express()

    app.get('/operacionsencilla', (req, res) => {
        let sum = 0;
        for (let i = 0; i < 10000; i++) {
            sum += i;
        }
        // console.log(`Peticion atendida por worker ${process.pid}; resultado: ${sum}`)
        process.send({ status: "success", message: `Peticion atendida por worker ${process.pid}; resultado: ${sum}` })

        res.send({ status: "success", message: `Peticion atendida por worker ${process.pid}; resultado: ${sum}` })
    })

    app.get('/operacioncompleja', (req, res) => {
        let sum = 0;
        for (let i = 0; i < 5e8; i++) {
            sum += i;
        }
        // console.log(`Peticion atendida por worker ${process.pid}; resultado: ${sum}`)

        process.send({ status: "success", message: `Peticion atendida por worker ${process.pid}; resultado: ${sum}` })

        res.send({ status: "success", message: `Peticion atendida por worker ${process.pid}; resultado: ${sum}` })
    })


    app.listen(3000, () => { "Server online en puerto 3000" })
}

let contador = 0

cluster.on('exit', () => {
    cluster.fork()
})

cluster.on('message', (worker, message) => {
    console.log(`Mensaje recibido desde el worker ${worker.id} /${worker.process.pid}: ${JSON.stringify(message)}`);
});
