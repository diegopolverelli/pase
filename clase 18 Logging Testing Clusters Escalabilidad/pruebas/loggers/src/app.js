import express from 'express';
import { addLogger } from './utils/logger.js';
import { config } from './config/config.js';
const PORT=config.app.PORT;


const app=express();
// console.clear()
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',addLogger,(req,res)=>{

    req.logger.critico(`Error...!!! - ${req.method} de ${req.url}`)
    req.logger.aviso(`Aviso error bajo nivel en ${req.method} de ${req.url}`)
    req.logger.log('critico','Prueba II de crítico...!!!')

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));