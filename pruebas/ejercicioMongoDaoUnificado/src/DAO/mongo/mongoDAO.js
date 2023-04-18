import { modeloUsuarios } from "./models/usuarios.model.js";
import { modeloJuguetes } from "./models/juguetes.model.js";
import { config } from "../../config/config.js";

import mongoose from "mongoose";

console.log("MongoDAO Online")

// mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase14')
    mongoose.connect(config.dataBase.MONGOURL,{dbName:config.dataBase.DB})
    .then(resultado=>console.log("Conectado a Mongo...!!!"))
    .catch(error=>console.log(error))

class MongoDAO{

    constructor() {
        this.models={
            juguetes:modeloJuguetes,
            usuarios:modeloUsuarios
        }
    }

    async get(coleccion, filtros){
        if(!this.models[coleccion]) throw new Error (`${coleccion} no existe en la DB`)

        let resultado=await this.models[coleccion].find(filtros);
        // console.log(usuarios)
        return resultado
    }

    async save(coleccion, aGrabar){
        if(!this.models[coleccion]) throw new Error (`${coleccion} no existe en la DB`)

        let resultado=await this.models[coleccion].create(aGrabar)
        return resultado
    }
}

export default MongoDAO