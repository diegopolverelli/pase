import { determinaPersistencia } from "../DAO/factory.js";


let daoJuguetes
let dao
const initDao=async()=>{
    dao=await determinaPersistencia()
    daoJuguetes=dao.juguetes
}
initDao()

export class JuguetesService{

    async getJuguetes(){
        return await daoJuguetes.get({})
    }

    async grabaJuguete(juguete){
        return await daoJuguetes.save(juguete)
    }
}

