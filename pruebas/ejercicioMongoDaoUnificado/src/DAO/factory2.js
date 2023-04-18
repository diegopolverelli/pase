import { config } from '../config/config.js'
// export let dao
let dao

let tipo=config.app.PERSISTENCIA

export const determinaDAO=async()=>{
    
    if(tipo=='MONGO'){
        
        const {default:daoMongo} = await import('./mongo/mongoDAO.js')
        dao=new daoMongo();
        
        
    }else{
        const {default:daoMemory} = await import('./memory/memoryDAO.js')
        dao=new daoMemory;
    }

    return dao

}

determinaDAO()
