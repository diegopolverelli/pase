import { generaDao } from '../dao/factory.js';

let dao;
const initDao=async()=>{
    dao=await generaDao()
}

initDao()

export class JuguetesService{
    constructor(dao){
        this.dao=dao
    }

    async getJuguetes(){
        return await dao.get('juguetes')
    }

    async getJuguetesBy(filtro){
        return dao.getBy('juguetes',filtro)
    }

    async saveJuguete(juguete){
        return dao.save('juguetes',juguete)
    }
}

export const juguetesService=new JuguetesService(dao)