// import { MemoryDAO } from "../DAO/memoryDao.js";
// import { DatabaseDAO } from "../DAO/databaseDao.js";
import { persistencia } from "../DAO/factory.js";


// const dao=new MemoryDAO();
const dao=await persistencia()

class UsuariosService{
    constructor(dao){
        this.dao=dao;
        this.coleccion='usuarios'
    }

    async getUsuarios(){
        return await this.dao.get(this.coleccion)
    }

    async getUsuariosByNombre(filtro){
        return await this.dao.get(this.coleccion, filtro)
    }

    async grabaUsuario(usuario){
        return await this.dao.post(this.coleccion, usuario)
    }

}

export const usuariosService=new UsuariosService(dao)
