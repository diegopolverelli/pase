import { negociosModelo } from "./models/negocios.modelo.js";


export class Negocio{
    constructor(){

    }

    async get(){
        return await negociosModelo.find()
    }

    async getBy(filtro){
        return await negociosModelo.findOne(filtro)
    }

    async save(negocio){
        return await negociosModelo.create(negocio)
    }

}