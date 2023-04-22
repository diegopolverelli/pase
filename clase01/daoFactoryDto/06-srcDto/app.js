import express from 'express';

import { UsuariosDaoMemory } from './dao/usuariosDaoMemory.js';
import { UsuariosDaoDB } from './dao/usuariosDaoDB.js';
import { UsuariosDto } from './dto/usuariosDto.js';

const PORT=3000;

// const usuariosDao=new UsuariosDaoMemory();
const usuariosDao=new UsuariosDaoDB();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/usuarios',async(req,res)=>{
    let usuarios=await usuariosDao.get();
    res.setHeader('Content-Type','application/json');
    res.status(200).send(usuarios);
})

app.get('/usuarios/:nombre',async(req,res)=>{
    let usuarios=await usuariosDao.getBy({nombre:req.params.nombre});
    res.setHeader('Content-Type','application/json');
    res.status(200).send(usuarios);
})


app.post('/usuarios',async(req,res)=>{
    let usuarioGrabado=await usuariosDao.save(new UsuariosDto(req.body));
    res.setHeader('Content-Type','application/json');
    res.status(201).send(usuarioGrabado);
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));