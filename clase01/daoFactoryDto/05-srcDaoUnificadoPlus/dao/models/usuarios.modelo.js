// import mongoose from 'mongoose'

// const usuariosColeccion='usuarios'
// const usuariosEsquema=new mongoose.Schema({
//     nombre: String, apellido: String
// })

// export const usuariosModelo=mongoose.model(usuariosColeccion, usuariosEsquema)

export const usuariosDef={
    coleccion:'usuarios',
    esquema:{
        nombre:String, apellido:String
    }
}