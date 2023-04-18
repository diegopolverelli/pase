import { config } from "../config/config.js";
import { DB } from "./singleton.js";
// import { DaoUsuariosMemory } from "./daoUsuariosMemory.js";
// import { DaoUsuariosMongo } from "./daoUsuariosMongo.js";

let PERSISTENCIA=config.app.PERSISTENCIA
let dao;

export const determinaPersistencia=async()=>{
    switch (PERSISTENCIA) {
        case 'MONGO':

            DB.Conectar()
            
            const {DaoUsuariosMongo} = await import('./daoUsuariosMongo.js')
            const {DaoJuguetesMongo} = await import('./daoJuguetesMongo.js')
            dao={
                usuarios:new DaoUsuariosMongo(),
                juguetes:new DaoJuguetesMongo()
            } 
            return dao
            break;
        case 'MEMORY':
            const {DaoUsuariosMemory} = await import('./daoUsuariosMemory.js')
            const {DaoJuguetesMemory} = await import('./daoJuguetesMemory.js')
            dao={
                usuarios:new DaoUsuariosMemory(),
                juguetes:new DaoJuguetesMemory()
            } 
            return dao
            break;
        default:
            break;
    }

}