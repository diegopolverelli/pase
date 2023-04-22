import {config} from '../config/config.js'
const persistencia=config.app.PERSISTENCIA||'MEMORY'

export const generaDao=async()=>{
    switch (persistencia) {
        case 'MEMORY':
            const {UsuariosDaoMemory} = await import('./usuariosDaoMemory.js')
            return new UsuariosDaoMemory()
            break;

        case 'MONGO':
            const {UsuariosDaoDB} = await import('./usuariosDaoDB.js')
            return new UsuariosDaoDB()
            break;

        default:
            break;
    }
}