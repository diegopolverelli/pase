import express from 'express';
import { CustomError } from './utils/CustomError.js';
import { errorAltaCliente, errorClienteInexistente, errorObtenerClienteById } from './utils/clientesErrores.js';
import { tiposDeError } from './utils/tiposDeError.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let clientes=[];

app.get('/clientes',(req,res)=>{
    res.setHeader('Content-Type','application/json');
    res.status(200).json({clientes});
})

app.get('/clientes/:id',(req,res)=>{

    let id=parseInt(req.params.id)
    if(typeof id !='number' || isNaN(id)){
        CustomError.CustomError('Dato invalido...!!!',errorObtenerClienteById(id),'Id invalido',tiposDeError.ERROR_TIPO_DE_DATOS)
    }

    let cliente=clientes.find(cli=>cli.id==req.params.id)

    if(!cliente){
        CustomError.CustomError('Cliente inexistente',errorClienteInexistente(id),'Cliente inexistente',tiposDeError.ERROR_ARGUMENTOS)
    }

    res.setHeader('Content-Type','application/json');
    res.status(200).json({cliente});
})


app.post('/clientes',(req,res)=>{

    let {nombre, apellido, email} = req.body

    // try {
        if(!nombre || !apellido || !email){
            CustomError.CustomError('Faltan Datos', errorAltaCliente({nombre, apellido, email}),"Faltan datos", tiposDeError.ERROR_ARGUMENTOS)
        }
    // } catch (error) {
    //     console.log(error.descrip)
    //     return res.status(error.codigo).json({mensaje:error.message})      
    // }


    let cliente={
        nombre, apellido, email
    }

    if(clientes.length==0){
        cliente.id=1
    }else{
        cliente.id=clientes[clientes.length-1].id +1
    }

    clientes.push(cliente)

    res.status(201).json({cliente})

})

app.use(errorMiddleware)


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));