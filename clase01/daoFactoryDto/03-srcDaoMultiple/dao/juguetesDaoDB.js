import mongoose from "mongoose";
import { juguetesModelo } from "./models/juguetes.modelo.js";
import { config } from "../config/config.js";
import { DB } from "./singletonDB.js";

export class JuguetesDaoDB{
    constructor(){
        this.connection=DB.conectar()
    }

    async get(){
        return await juguetesModelo.find()
    }

    async getBy(filtro){
        return await juguetesModelo.find(filtro)
    }

    async save(juguete){
        return await juguetesModelo.create(juguete)
    }

}