import { juguetesModelo } from "./models/juguetes.model.js";
import { usuariosModelo } from "./models/usuarios.model.js";
import mongoose from "mongoose";
import {config} from '../config/config.js'

mongoose.connect(config.database.MONGOURL, {dbName: config.database.DB})
    .then(resultado=>console.log('Conectado a la DB'))
    .catch(error=>console.log(error))


export class DatabaseDAO{
    constructor(){
        this.colecciones={
            usuarios:usuariosModelo,
            juguetes:juguetesModelo
        }
    }

    async get(coleccion, filtro){
        if(!this.colecciones[coleccion]) throw new Error(`${coleccion} no existe en la DB`)

        return await this.colecciones[coleccion].find(filtro) 
    }

    async post(coleccion, aGrabar){
        if(!this.colecciones[coleccion]) throw new Error(`${coleccion} no existe en la DB`)
        return await this.colecciones[coleccion].create(aGrabar)
    }

}