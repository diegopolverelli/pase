import express from 'express';
import { determinaDAO } from './DAO/factory2.js';

const PORT=3000;
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let dao;
const init=async()=>{
    dao=await determinaDAO()
}
init()

app.get('/usuarios/',async (req,res)=>{
    
    // let prueba= new Contacts()
    let prueba2=await dao.get('usuarios',{})

    res.setHeader('Content-Type','text/plain');
    res.status(200).send({prueba2});
})

app.post('/usuarios',async(req,res)=>{

    let usuarioGrabado=await dao.save('usuarios',{
        nombre:req.body.nombre.toUpperCase(),
        apellido:req.body.apellido.toUpperCase()
    })

    res.status(201).send({usuarioGrabado})
})

app.get('/usuarios/:nombre',async (req,res)=>{
    
    // let prueba= new Contacts()
    let usuarios=await dao.get('usuarios',{nombre:req.params.nombre})

    res.setHeader('Content-Type','text/plain');
    res.status(200).send({usuarios});
})

app.get('/juguetes',async (req,res)=>{
    
    // let prueba= new Contacts()
    let juguetes=await dao.get('juguetes',{precio:{$gte:400}})

    res.setHeader('Content-Type','text/plain');
    res.status(200).send({juguetes});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));