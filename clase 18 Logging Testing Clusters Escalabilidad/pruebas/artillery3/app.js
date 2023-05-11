import express from 'express';
import {faker} from '@faker-js/faker'
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let usuarios=[]


faker.locale='es'

app.get('/usuario',(req,res)=>{
    let nombre=faker.name.fullName()
    let usuario={
        nombre
    }
    console.log(usuario)
    res.setHeader('Content-Type','application/json');
    res.status(200).send(usuario)
})

app.post('/endpoint1',(req,res)=>{

    let nombre=req.body.name

    let usuario={
        nombre
    }

    if(usuarios.length==0){
        usuario.id=1
    }else{
        usuario.id=usuarios[usuarios.length-1].id+1
    }

    usuarios.push(usuario)
    console.log(usuario)

    res.setHeader('Content-Type','application/json');
    res.status(200).send(usuario);
})

app.get('/endpoint2/:id',(req,res)=>{
    let id=req.params.id;
    if(!id) return res.status(400).send('No recibí id')
    let usuario=usuarios.find(u=>u.id==id)
    if(!usuario) return res.status(400).send('No existe usuario')
    console.log(usuario)
    res.status(200).send(usuario)

})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));