import express from 'express';
// import { dao } from './DAO/factory2.js';
import { config } from '../config/config.js';
import { router as usuariosRouter } from './routes/usuarios.router.js';

const PORT=config.app.PORT;


const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', usuariosRouter)

// app.get('/',async (req,res)=>{
    
//     let juguetes=await dao.get()

//     res.setHeader('Content-Type','text/plain');
//     res.status(200).send({juguetes});
// })

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));