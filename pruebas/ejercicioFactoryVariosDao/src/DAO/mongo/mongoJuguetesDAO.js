import { modeloJuguetes } from "./models/juguetes.model.js";
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
        let juguetes=await modeloJuguetes.find();
        // console.log(usuarios)
        return juguetes
    }

    async save(document){
        let juguete=await modeloJuguetes.create(document)
        return juguete
    }

}

export default MongoDAO