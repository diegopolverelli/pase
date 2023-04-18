// import { modeloUsuarios } from "./models/usuarios.model.js";
// import { modeloJuguetes } from "./models/juguetes.model.js";

import { usuarios } from "./models/usuarios.model.js";
import { juguetes } from "./models/juguetes.model.js";

import { config } from "../../config/config.js";

import mongoose, { mongo } from "mongoose";

console.log("MongoDAO Online")

// mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase14')
    // mongoose.connect(config.MONGOURL)
    // .then(resultado=>console.log("Conectado a Mongo...!!!"))
    // .catch(error=>console.log(error))

class MongoDAO{

    constructor() {
        this.mongoose=mongoose.connect(config.dataBase.MONGOURL,{dbName:config.dataBase.DB})
                        .then(rta=>console.log('Conectado a DB'))
        const timestamps={timestamps:{createdAt:'Fecha de alta', updatedAt:'Fecha de modificación'}}

        const usuariosEsquema=mongoose.Schema(usuarios.esquema, timestamps)
        const juguetesEsquema=mongoose.Schema(juguetes.esquema, timestamps)
        this.models={
            [juguetes.coleccion]:mongoose.model(juguetes.coleccion, juguetesEsquema ),
            [usuarios.coleccion]:mongoose.model(usuarios.coleccion, usuariosEsquema)
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