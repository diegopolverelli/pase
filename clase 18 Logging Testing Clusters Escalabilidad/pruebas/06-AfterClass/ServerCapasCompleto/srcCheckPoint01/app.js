import express from 'express';
import { config } from './config/config.js';

import { router as usuariosRouter } from './routes/usuarios.router.js';
import { router as negociosRouter } from './routes/negocios.router.js';
import { router as ordenesRouter } from './routes/ordenes.router.js';

const PORT=config.app.PORT||8080;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/usuarios', usuariosRouter)
app.use('/api/negocios', negociosRouter)
app.use('/api/ordenes', ordenesRouter)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));