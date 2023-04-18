import { determinaPersistencia } from "../DAO/factory.js";


let daoUsuarios
let dao
const initDao=async()=>{
    dao=await determinaPersistencia()
    daoUsuarios=dao.usuarios
}
initDao()

export class UsuariosService{

    async getUsuarios(){
        return await daoUsuarios.get({})
    }

    async grabaUsuario(usuario){
        return await daoUsuarios.save(usuario)
    }
}

