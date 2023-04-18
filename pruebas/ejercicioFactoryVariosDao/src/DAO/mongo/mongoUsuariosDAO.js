import { modeloUsuarios } from "./models/usuarios.model.js";
import mongoose from "mongoose";
import { DB } from "./singleton.js";

// import { config } from "../../../config/config.js";

// console.log("Pasó por el mongo DAO")

// mongoose.connect(config.Database.MONGOURL,{dbName:config.Database.DB})
//     .then(resultado=>console.log("Conectado a Mongo...!!!"))
//     .catch(error=>console.log(error))

DB.getInstancia();

class MongoDAO{

    async get(){
        let usuarios=await modeloUsuarios.find();
        // console.log(usuarios)
        return usuarios
    }

    async save(document){
        let usuario=await modeloUsuarios.create(document)
        return usuario
    }

}

export default MongoDAO