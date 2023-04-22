// import { usuariosModelo } from "./models/usuarios.modelo.js"
// import { juguetesModelo } from "./models/juguetes.modelo.js";
import mongoose from 'mongoose';
import {usuariosDef} from './models/usuarios.modelo.js'
import {juguetesDef} from './models/juguetes.modelo.js'

import { DB } from "./singletonDB.js";

const modelos={}
const getOrCreateModel=(col, esq)=>{
    if(!modelos[col]){
        modelos[col]=mongoose.model(col, esq)
    }
    return modelos[col]
}

export class DaoDB{
    constructor(){
        this.connection=DB.conectar()

        const usuariosEsquema=new mongoose.Schema(usuariosDef.esquema)
        const juguetesEsquema=new mongoose.Schema(juguetesDef.esquema)

        this.colecciones={
            [usuariosDef.coleccion]:getOrCreateModel(usuariosDef.coleccion, usuariosEsquema),
            [juguetesDef.coleccion]:getOrCreateModel(juguetesDef.coleccion, juguetesEsquema)
        }
    }

    async get(coleccion){
        return await this.colecciones[coleccion].find()
    }

    async getBy(coleccion, filtro){
        return await this.colecciones[coleccion].find(filtro)
    }

    async save(coleccion, aGrabar){
        return await this.colecciones[coleccion].create(aGrabar)
    }

}