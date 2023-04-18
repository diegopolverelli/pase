export let dao

let tipo='MONGO'

const determinaDAO=async()=>{
    
    if(tipo=='MONGO'){
        
        const {default:daoMongo} = await import('./mongo/mongoDAO.js')
        dao=new daoMongo();
        
    }else{
        const {default:daoMemory} = await import('./memory/memoryDAO.js')
        dao=new daoMemory();
    }
}

determinaDAO()
