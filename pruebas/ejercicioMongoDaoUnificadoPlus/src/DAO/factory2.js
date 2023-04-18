import { config } from '../config/config.js'
export let dao

// let dao

let tipo=config.app.PERSISTENCIA

export const determinaDAO=async()=>{
    
    if(tipo=='MONGO'){
        
        const {default:mongoDao} = await import('./mongo/mongoDAO.js')
        dao=new mongoDao();
        return dao
        // console.log(Contacts)
        
    }else{
        const {default:memoryDao} = await import('./memory/memoryDAO.js')
        dao=new memoryDao();
        return dao
    }
}

// determinaDAO()