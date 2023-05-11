import { usuariosModelo } from "./models/usuarios.modelo.js";


export class Usuario{
    constructor(){

    }

    async get(){
        return await usuariosModelo.find()
    }

    async getBy(filtro){
        return await usuariosModelo.findOne(filtro)
    }

    async save(usuario){
        return await usuariosModelo.create(usuario)
    }

    async update(filtro, usuario){
        return await usuariosModelo.updateOne(filtro, usuario)
    }

}