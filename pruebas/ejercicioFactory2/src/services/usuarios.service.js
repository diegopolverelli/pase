import { determinaPersistencia } from "../DAO/factory.js";

let daoUsuarios
const initDao=async()=>{
    daoUsuarios=await determinaPersistencia()
}
initDao()

export class UsuariosService{

    async getUsuarios(filtro){
        return await daoUsuarios.get(filtro)
    }

    async grabaUsuario(usuario){
        return await daoUsuarios.save(usuario)
    }
}

