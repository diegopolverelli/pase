import { ordenesModelo } from "./models/ordenes.modelo.js";


export class Orden{
    constructor(){

    }

    async get(){
        return await ordenesModelo.find().populate('usuario').populate('negocio')
    }

    async getBy(filtro){
        return await ordenesModelo.findOne(filtro)
    }

    async save(orden){
        return await ordenesModelo.create(orden)
    }

}