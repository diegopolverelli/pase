import { determinaDAO } from "../DAO/factory2.js";

let dao;
const initDao=async()=>{
    dao=await determinaDAO()
}
initDao()

class UsuarioService{
    constructor(){}

    async getUsuarios(){
        return await dao.usuarios.get()
    }

    async grabaUsuario(usuario){
        return await dao.usuarios.save(usuario)
    }

}

export const usuariosService=new UsuarioService()