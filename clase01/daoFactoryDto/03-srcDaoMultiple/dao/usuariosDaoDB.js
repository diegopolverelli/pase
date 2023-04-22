import mongoose from "mongoose";
import { usuariosModelo } from "./models/usuarios.modelo.js";
import { config } from "../config/config.js";
import { DB } from "./singletonDB.js";

export class UsuariosDaoDB{
    constructor(){
        this.connection=DB.conectar()
    }

    async get(){
        return await usuariosModelo.find()
    }

    async getBy(filtro){
        return await usuariosModelo.find(filtro)
    }

    async save(usuario){
        return await usuariosModelo.create(usuario)
    }

}