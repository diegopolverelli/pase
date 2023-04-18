import mongoose from "mongoose";
import { config } from "../../../config/config.js";

console.log("Pasó por el mongo DAO")


export class DB{
    static #instancia;
    constructor(){
        mongoose.connect(config.Database.MONGOURL,{dbName:config.Database.DB})
            .then(resultado=>console.log("Conectado a Mongo...!!!"))
            .catch(error=>console.log(error))
    }

    static getInstancia(){
        if(DB.#instancia){
            console.log('ya existe una instancia')
            return DB.#instancia
        }else{
            DB.#instancia=new DB()
            return DB.#instancia
        }
    }
}