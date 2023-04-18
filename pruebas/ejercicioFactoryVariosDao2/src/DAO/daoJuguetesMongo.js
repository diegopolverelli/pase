// import { mongoose } from "mongoose";
import { juguetesModelo } from "./models/juguetes.model.js";
// import { config } from "../config/config.js";

// mongoose.connect(config.dataBase.MONGOURL,{dbName:config.dataBase.DB})
//     .then(resultado=>console.log('Conecto OK a Servidor DB'))

// import { DB } from "./singleton.js";

// DB.Conectar();

export class DaoJuguetesMongo{
    constructor(){

    }

    async get(filtro){
        return await juguetesModelo.find(filtro)
    }

    async save(juguete){
        return await juguetesModelo.create(juguete)
    }
}