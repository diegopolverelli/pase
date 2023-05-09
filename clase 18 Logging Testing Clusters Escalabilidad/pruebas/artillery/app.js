import __dirname from './utils/utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';

const PORT=3000;

const app=express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'../views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'../public')));

app.get('/',async(req,res)=>{

    let usuarios=await modelo.find().limit(50).lean()

    let suma=0;
    for(let i=0;i<20000;i++){
        suma=suma+i;
        usuarios.push({
            nombre:'Juan',apellido:'Perez'
        })
    }

    res.setHeader('Content-Type','text/plain');
    res.status(200).send({usuarios});
})

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('home');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

let modelo;
const conectar=async()=>{
    try {
        await mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase16')
        console.log(`Conexión a DB establecida`)

        modelo=mongoose.model('usuarios',new mongoose.Schema({nombre:String, apellido:String}))
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }
}

conectar();

server.on('error',(error)=>console.log(error));