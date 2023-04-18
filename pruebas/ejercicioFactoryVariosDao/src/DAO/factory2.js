let dao

let tipo='MONGO'

export const determinaDAO=async()=>{
    
    if(tipo=='MONGO'){
        
        const {default:daoUsuariosMongo} = await import('./mongo/mongoUsuariosDAO.js')
        const {default:daoJuguetesMongo} = await import('./mongo/mongoJuguetesDAO.js')

        dao={
            usuarios:new daoUsuariosMongo(),
            juguetes:new daoJuguetesMongo(),
        } 
        return dao
        
    }else{
        const {default:daoMemory} = await import('./memory/memoryDAO.js')
        dao=new daoMemory();
        return dao
    }
}

// determinaDAO()
