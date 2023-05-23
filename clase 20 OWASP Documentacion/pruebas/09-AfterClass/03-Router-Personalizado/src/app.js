import express from 'express';
import { UsuariosRouter } from './routes/usuarios.router.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const usuariosRouter=new UsuariosRouter();
app.use('/api/usuarios',usuariosRouter.getRouter())


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));