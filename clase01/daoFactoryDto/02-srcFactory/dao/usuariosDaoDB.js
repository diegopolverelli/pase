import mongoose from "mongoose";
import { usuariosModelo } from "./models/usuarios.modelo.js";
import { config } from "../config/config.js";

export class UsuariosDaoDB{
    constructor(){
        this.connection=mongoose.connect(config.database.MONGOURL,{
            dbName:config.database.DB
        })
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