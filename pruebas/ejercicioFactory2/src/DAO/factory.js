import { config } from "../config/config.js";
// import { DaoUsuariosMemory } from "./daoUsuariosMemory.js";
// import { DaoUsuariosMongo } from "./daoUsuariosMongo.js";

let PERSISTENCIA=config.app.PERSISTENCIA
let dao;

export const determinaPersistencia=async()=>{
    switch (PERSISTENCIA) {
        case 'MONGO':
            const {DaoUsuariosMongo} = await import('./daoUsuariosMongo.js')
            dao=new DaoUsuariosMongo()
            return dao
            break;
        case 'MEMORY':
            const {DaoUsuariosMemory} = await import('./daoUsuariosMemory.js')
            dao=new DaoUsuariosMemory()
            return dao
            break;
        default:
            break;
    }

}