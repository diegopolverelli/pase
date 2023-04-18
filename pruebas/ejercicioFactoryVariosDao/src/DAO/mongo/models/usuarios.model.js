import mongoose from 'mongoose';


const esquema=new mongoose.Schema({
    nombre:String, apellido:String
})

export const modeloUsuarios=mongoose.model('usuarios',esquema)