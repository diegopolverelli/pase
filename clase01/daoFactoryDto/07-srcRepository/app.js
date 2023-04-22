import express from 'express';

import { config } from './config/config.js';
import { UsuariosDto } from './dto/usuariosDto.js';
import { usuariosService } from './services/usuariosRepository.js';
import { juguetesService } from './services/juguetesRepository.js';

// import { UsuariosDaoMemory } from './dao/usuariosDaoMemory.js';
// import { UsuariosDaoDB } from './dao/usuariosDaoDB.js';

// import { generaDao } from './dao/factory.js';


const PORT=config.app.PUERTO||8080;

// let dao;
// const initDao=async()=>{
//     dao=await generaDao()
// }

// initDao()


const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/usuarios',async(req,res)=>{
    let usuarios=await usuariosService.getUsuarios()
    res.setHeader('Content-Type','application/json');
    res.status(200).send(usuarios);
})

app.get('/usuarios/:nombre',async(req,res)=>{
    let usuarios=await usuariosService.getUsuariosBy({nombre:req.params.nombre});
    res.setHeader('Content-Type','application/json');
    res.status(200).send(usuarios);
})



app.post('/usuarios',async(req,res)=>{
    let usuarioGrabado=await usuariosService.saveUsuario(new UsuariosDto(req.body));
    res.setHeader('Content-Type','application/json');
    res.status(201).send(usuarioGrabado);
})

app.get('/juguetes',async(req,res)=>{
    let juguetes=await juguetesService.getJuguetes();
    res.setHeader('Content-Type','application/json');
    res.status(200).send(juguetes);
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));