import {config} from '../config/config.js'
const persistencia=config.app.PERSISTENCIA||'MEMORY'

export const generaDao=async()=>{
    switch (persistencia) {
        case 'MEMORY':
            // const {UsuariosDaoMemory} = await import('./usuariosDaoMemory.js')
            // const {JuguetesDaoMemory} = await import('./juguetesDaoMemory.js')
            const {DaoMemory} = await import('./daoMemory.js')
            return new DaoMemory()
            
            break;

        case 'MONGO':
            // const {UsuariosDaoDB} = await import('./usuariosDaoDB.js')
            // const {JuguetesDaoDB} = await import('./juguetesDaoDB.js')
            const {DaoDB} =await import('./daoDB.js')

            return new DaoDB()
            break;

        default:
            break;
    }
}