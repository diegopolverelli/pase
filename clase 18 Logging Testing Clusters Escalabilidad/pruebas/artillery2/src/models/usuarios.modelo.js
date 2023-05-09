import mongoose from "mongoose";

export const usuariosModelo=mongoose.model('usuarios',new mongoose.Schema({nombre:String,apellido:String,
email:String,password:String}));

