import express from 'express';
import { determinaDAO } from './DAO/factory2.js';
import { config } from './config/config.js';

const PORT=config.app.PORT;

const app=express();

// let pp
// setTimeout(async() => {
//     pp=new Contacts()
//     console.log(await pp.get('usuarios',{nombre:'ESTEBAN'}))
// }, 3000);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let dao;
const initDao=async()=>{
    dao=await determinaDAO()
}
initDao()

app.get('/usuarios',async (req,res)=>{
    
    let usuarios=await dao.get('usuarios',{})

    res.setHeader('Content-Type','text/plain');
    res.status(200).send({usuarios});
})

app.get('/usuarios/:nombre',async (req,res)=>{
    
    let usuarios=await dao.get('usuarios',{nombre:req.params.nombre})

    res.setHeader('Content-Type','text/plain');
    res.status(200).send({usuarios});
})

app.post('/usuarios',async(req,res)=>{

    let usuarioGrabado=await dao.save('usuarios',{
        nombre:req.body.nombre.toUpperCase(),
        apellido:req.body.apellido.toUpperCase()
    })

    res.setHeader('Content-Type','text/plain');
    res.status(201).send({usuarioGrabado});


})

app.get('/juguetes',async (req,res)=>{
    
    let juguetes=await dao.get('juguetes',{})

    res.setHeader('Content-Type','text/plain');
    res.status(200).send({juguetes});
})

app.get('/juguetes/:precio',async (req,res)=>{
    
    let juguetes=await dao.get('juguetes',{precio:{$gte:req.params.precio}})

    res.setHeader('Content-Type','text/plain');
    res.status(200).send({juguetes});
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));