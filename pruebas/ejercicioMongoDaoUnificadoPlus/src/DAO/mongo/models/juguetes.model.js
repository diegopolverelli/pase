import mongoose from 'mongoose';

// mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase14')
//     .then(resultado=>console.log("Conectado a Mongo...!!!"))
//     .catch(error=>console.log(error))

// const esquema=new mongoose.Schema({
//     nombre:String, precio:Number
// })

// export const modeloJuguetes=mongoose.model('juguetes',esquema)

export const juguetes={
    coleccion:'juguetes',
    esquema:{
        nombre:String,
        precio:Number,
        marca:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'marcas'
        }
    }
}