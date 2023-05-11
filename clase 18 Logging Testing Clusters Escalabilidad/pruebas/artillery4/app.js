import cluster from 'cluster'
import { cpus } from 'os'

import express from 'express';
// import {faker} from '@faker-js/faker'

import { Faker, de, es_MX } from '@faker-js/faker';

const faker = new Faker({
    locale: [es_MX],
});

const numeroDeProcesadores = cpus().length
console.log(`Numero de procesadores: ${numeroDeProcesadores}`)


const PORT = 3000;

if (cluster.isPrimary) {
    console.log('Proceso primario generando proceso worker')
    for (let i = 0; i < numeroDeProcesadores; i++) {
        cluster.fork()
    }
} else {
    console.log(`Proceso worker, con pid ${process.pid}`)

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    let usuarios = []


    // faker.locale='es'
    app.get('/usuario', (req, res) => {
        let nombre = faker.person.fullName()

        res.send({ nombre })
    })

    app.get('/usuarios/:id', (req, res) => {

        let usuario = usuarios.find(u => u.id == req.params.id)

        if (!usuario) return res.status(404).send('Usario no encontrado')

        console.log(`Va a imprimir a ${usuario.nombre}`)

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(usuario);
    })

    app.post('/usuarios', (req, res) => {
        let nombre = req.body.nombre
        if (!nombre) return res.status(400).send('Ingrese nombre')

        let usuario = {
            nombre
        }

        if (usuarios.length == 0) {
            usuario.id = 1
        } else {
            usuario.id = usuarios[usuarios.length - 1].id + 1
        }

        usuarios.push(usuario)

        console.log(usuario,'impreso desde ',process.pid)

        res.status(201).send(usuario)
    })

    const server = app.listen(PORT, () => {
        console.log(`Server escuchando en puerto ${PORT}`);
    });

    server.on('error', (error) => console.log(error));


}
