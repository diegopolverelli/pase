import { mongoose } from "mongoose";
import { config } from "../config/config.js";


export class DB{
    static #instancia;
    constructor(){
        mongoose.connect(config.dataBase.MONGOURL,{dbName:config.dataBase.DB})
            .then(resultado=>console.log('Conecto OK a Servidor DB'))
    }

    static Conectar(){
        if(DB.#instancia){
            console.log('Conexión previamente establecida')
            return DB.#instancia
        }else{
            DB.#instancia=new DB()
            return DB.#instancia
        }
    }
}