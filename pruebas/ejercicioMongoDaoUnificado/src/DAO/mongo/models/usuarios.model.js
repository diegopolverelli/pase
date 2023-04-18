import mongoose from 'mongoose';

// mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase14')
//     .then(resultado=>console.log("Conectado a Mongo...!!!"))
//     .catch(error=>console.log(error))

const esquema=new mongoose.Schema({
    nombre:String, apellido:String
})

export const modeloUsuarios=mongoose.model('usuarios',esquema)