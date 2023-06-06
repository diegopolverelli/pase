import __dirname from './utils/utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';

const PORT=3000;

const app=express();

app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'../views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.use(express.static(path.join(__dirname,'../public')));

// app.get('/',(req,res)=>{
//     res.setHeader('Content-Type','text/plain');
//     res.status(200).send('OK');
// })

const heroeModelo=mongoose.model('heroes',new mongoose.Schema({
    nombre:{unique: true, type: String}, poder: String, empresa: String
}))

app.get('/',async(req,res)=>{

    let heroes=await heroeModelo.find()
    if(heroes.length==0){
        console.log(heroes)
        let CreaHeroes=[
            {
                nombre:'Ironman', poder:'Inteligencia, valor', empresa:'Marvel'
            },
            {
                nombre:'Hulk', poder:'Fuerza', empresa:'Marvel'
            },
            {
                nombre:'Batman', poder:'Inteligencia, valor', empresa:'DC'
            },
            {
                nombre:'CapitanaMarvel', poder:'Fuerza', empresa:'Marvel'
            },
        ]
        await heroeModelo.insertMany(CreaHeroes)
        heroes=await heroeModelo.find()
    }

    console.log(heroes)

    res.setHeader('Content-Type','text/html');
    res.status(200).render('home');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const conectar=async()=>{
    try {
        await mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=afterClass10')
        console.log(`Conexión a DB establecida`)
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }
}

conectar();

server.on('error',(error)=>console.log(error));