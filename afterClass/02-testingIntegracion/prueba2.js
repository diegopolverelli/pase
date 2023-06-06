import express from 'express';
import mongoose from 'mongoose';
import {engine} from 'express-handlebars';

const PORT=3000;

const app=express();

await mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase21')

let modelo=mongoose.model('users',new mongoose.Schema({
    first_name: String, last_name: String, email: String
}))

let resultado=await modelo.find();

console.log(Object.keys(resultado[0]))
console.log(Object.entries(resultado[0]))

resultado=resultado.map(u=>u.toJSON())

app.engine('handlebars', engine({
// runtimeOptions: {
//     allowProtoPropertiesByDefault: true,
//     allowProtoMethodsByDefault: true,
// },
}));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// app.get('/',(req,res)=>{
//     res.setHeader('Content-Type','text/plain');
//     res.status(200).send('OK');
// })

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('index',{
        resultado
    });
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));