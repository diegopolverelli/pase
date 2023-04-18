import mongoose from 'mongoose';


const esquema=new mongoose.Schema({
    nombre:String, precio:Number
})

export const modeloJuguetes=mongoose.model('juguetes',esquema)