import { usuariosModelo } from "./models/usuarios.modelo.js"
import { juguetesModelo } from "./models/juguetes.modelo.js";
import { DB } from "./singletonDB.js";

export class DaoDB{
    constructor(){
        this.connection=DB.conectar()
        this.colecciones={
            usuarios:usuariosModelo,
            juguetes:juguetesModelo
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