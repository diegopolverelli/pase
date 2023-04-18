// import mongoose from'mongoose'
import { usuariosModelo } from "./models/usuarios.models.js";
// import { config } from "../config/config.js";

// mongoose.connect(config.dataBase.MONGOURL,{dbName:config.dataBase.DB})
//     .then(resultado=>console.log('Conecto OK a Servidor DB'))
// import {DB} from './singleton.js'

// DB.Conectar();

export class DaoUsuariosMongo{
    constructor(){

    }

    async get(filtro){
        return await usuariosModelo.find(filtro)
    }

    async save(usuario){
        return await usuariosModelo.create(usuario)
    }
}