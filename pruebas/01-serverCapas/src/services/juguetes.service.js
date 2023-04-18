// import { MemoryDAO } from "../DAO/memoryDao.js";
// import { DatabaseDAO } from "../DAO/databaseDao.js";
import { persistencia } from "../DAO/factory.js";


// const dao=new MemoryDAO();
const dao=await persistencia()

class JuguetesService{
    constructor(dao){
        this.dao=dao;
        this.coleccion='juguetes'
    }

    async getJuguetes(){
        return await this.dao.get(this.coleccion)
    }

    async grabaJuguete(juguete){
        return await this.dao.post(this.coleccion, juguete)
    }

}

export const juguetesService=new JuguetesService(dao)
