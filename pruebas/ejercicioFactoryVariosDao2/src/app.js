import express from 'express';
import { config } from './config/config.js';
import usuariosRouter from './routers/usuarios.router.js';
import juguetesRouter from './routers/juguetes.router.js';

const PORT=config.app.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',usuariosRouter)
app.use('/juguetes',juguetesRouter)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));