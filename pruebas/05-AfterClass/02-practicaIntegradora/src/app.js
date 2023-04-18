import __dirname from './utils/utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import { config } from './config/config.js';
import { VistasRouter } from './routes/vistas.router.js';
import { UsuariosRouter } from './routes/usuarios.router.js';
import passport from 'passport';
import { inicializaEstrategias } from './config/passport.config.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'

const PORT=config.PORT;

const app=express();
const vistasRouter=new VistasRouter();
const usuariosRouter=new UsuariosRouter();

app.engine('handlebars', engine({
runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
},
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'../views'));

const opcionesCors = {
    origin: ['http://localhost:3100', 'https://example.com'],
  };

app.use(cors(opcionesCors))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
inicializaEstrategias();
app.use(passport.initialize());


app.use('/',vistasRouter.getRouter())
app.use('/api/usuarios',usuariosRouter.getRouter())

// app.use(express.static(path.join(__dirname,'../public')));

// app.get('/',(req,res)=>{
//     res.setHeader('Content-Type','text/plain');
//     res.status(200).send('OK');
// })

// app.get('/',(req,res)=>{
//     res.setHeader('Content-Type','text/html');
//     res.status(200).render('home');
// })

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const conectar=async()=>{
    try {
        await mongoose.connect(config.MONGOURL)
        console.log(`Conexión a DB establecida`)
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }
}

conectar();

server.on('error',(error)=>console.log(error));