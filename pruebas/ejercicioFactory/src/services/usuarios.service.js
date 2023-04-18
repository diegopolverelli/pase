import { dao } from "../DAO/factory2.js";

class UsuarioService{
    constructor(){}

    async getUsuarios(){
        return await dao.get()
    }

    async grabaUsuario(usuario){
        return await dao.save(usuario)
    }

}

export const usuariosService=new UsuarioService()