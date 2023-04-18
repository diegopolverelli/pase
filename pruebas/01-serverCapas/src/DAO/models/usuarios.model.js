import mongoose from 'mongoose'

const usuariosColeccion='usuarios'
const usuariosEsquema=new mongoose.Schema({
    nombre:String, precio: Number
})

export const usuariosModelo=mongoose.model(usuariosColeccion,usuariosEsquema)