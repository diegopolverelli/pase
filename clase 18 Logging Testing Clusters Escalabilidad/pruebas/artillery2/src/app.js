import __dirname from './utils/utils.js';
import {creaHash, validaPassword} from './utils/utils.js'
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import { usuariosModelo } from './models/usuarios.modelo.js';
// import {Faker} from '@faker-js/faker'
import {faker} from '@faker-js/faker'
import cluster from 'cluster'
import {cpus} from 'os';

const PORT=3000;

const numeroDeProcesadores=cpus().length
console.log(numeroDeProcesadores)


faker.locale='es'


if (cluster.isPrimary){
    console.log('Proceso Primario')
    for(let i=0; i<numeroDeProcesadores; i++){
        cluster.fork()
    }
    
}else{
    console.log ("Proceso forkeado")
    console.log(`Soy un proceso worker con id: ${process.pid}`)

    const app=express();
    
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    
    app.use(express.static(path.join(__dirname,'../public')));

    app.get('/usuario',(req,res)=>{
        let nombre=faker.name.firstName()
        let apellido=faker.name.lastName()
        let email=faker.internet.email()
        let password=faker.internet.password()
    
        let promedio=(1+3+4+5+4+4+4+4+4+1000)/10
        console.log(promedio)

        let usuario={
            nombre, apellido, email, password
        }
    
         res.send(usuario)
    })
    
    app.post('/registro',async(req,res)=>{
    
        let {nombre, apellido, email, password}=req.body
        if(!email || !password) return res.status(400).send('Error datos incompletos')
    
        let usuario=await usuariosModelo.findOne({email:email})
        if(usuario) return res.status(400).send(`Ya existe un usuario con mail ${email} en la BD`)
    
        usuario={
            nombre, apellido, email,
            password:creaHash(password)
        }
    
        let usuarioGrabado=await usuariosModelo.create(usuario)
    
        console.log('Registrado...!!! usuario:',nombre,apellido,email)
    
        res.setHeader('Content-Type','text/plain');
        res.status(201).send(usuarioGrabado);
    })
    
    app.post('/login',async(req,res)=>{
        let {email, password}=req.body
        if(!email || !password) return res.send('Faltan datos')
    
        let usuario=await usuariosModelo.findOne({email:email})
        if(!usuario) return res.send('Usuario inexistente')
    
        if (!validaPassword(password, usuario)) return res.send('Clave invalida')
    
        console.log('Login correcto ',email)
        res.send('Login Correcto...!!!')
    })
    
    const server=app.listen(PORT,()=>{
        console.log(`Server escuchando en puerto ${PORT}`);
    });

    server.on('error',(error)=>console.log(error));
}



const conectar=async()=>{
    try {
        await mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase18')
        console.log(`Conexión a DB establecida`)
        
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: err`)
    }
}

conectar();
