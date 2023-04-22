import mongoose from "mongoose";
import { config } from "../config/config.js";

export class DB{
    static #coneccion;
    constructor(){
        mongoose.connect(config.database.MONGOURL,{
            dbName:config.database.DB
        })
                                .then(resConn=>{
                                    console.log('Conectado a DB...!!!')
                                    DB.#coneccion=resConn
                                })
                                .catch((error)=>console.log(error))
    }

    static conectar(){
        if(DB.#coneccion){
            console.log('La conección ya se había establecido previamente')
            return DB.#coneccion
        }else{
            DB.#coneccion=true;
            DB.#coneccion=new DB()
            return DB.#coneccion
        }
    }
}