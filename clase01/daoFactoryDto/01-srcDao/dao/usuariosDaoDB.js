import mongoose from "mongoose";
import { usuariosModelo } from "./models/usuarios.modelo.js";

export class UsuariosDaoDB{
    constructor(){
        this.connection=mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase15')
                                .then(resConn=>console.log('Conectado a DB...!!!'))
                                .catch((error)=>console.log(error))
    }

    async get(){
        return await usuariosModelo.find()
    }

    async getBy(filtro){
        return await usuariosModelo.find(filtro)
    }

    async save(usuario){
        return await usuariosModelo.create(usuario)
    }

}