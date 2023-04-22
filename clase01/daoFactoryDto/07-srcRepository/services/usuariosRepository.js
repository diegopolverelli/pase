import { generaDao } from '../dao/factory.js';

let dao;
const initDao=async()=>{
    dao=await generaDao()
}

initDao()

export class UsuariosService{
    constructor(dao){
        this.dao=dao
    }

    async getUsuarios(){
        return await dao.get('usuarios')
    }

    async getUsuariosBy(filtro){
        return dao.getBy('usuarios',filtro)
    }

    async saveUsuario(usuario){
        return dao.save('usuarios',usuario)
    }
}

export const usuariosService=new UsuariosService(dao)