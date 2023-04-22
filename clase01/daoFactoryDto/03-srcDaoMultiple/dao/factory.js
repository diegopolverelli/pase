import {config} from '../config/config.js'
const persistencia=config.app.PERSISTENCIA||'MEMORY'

export const generaDao=async()=>{
    switch (persistencia) {
        case 'MEMORY':
            const {UsuariosDaoMemory} = await import('./usuariosDaoMemory.js')
            const {JuguetesDaoMemory} = await import('./juguetesDaoMemory.js')

            return {
                usuarios:new UsuariosDaoMemory(),
                juguetes:new JuguetesDaoMemory()
            }
            
            break;

        case 'MONGO':
            const {UsuariosDaoDB} = await import('./usuariosDaoDB.js')
            const {JuguetesDaoDB} = await import('./juguetesDaoDB.js')

            return {
                usuarios:new UsuariosDaoDB(),
                juguetes:new JuguetesDaoDB()
            }
            break;

        default:
            break;
    }
}