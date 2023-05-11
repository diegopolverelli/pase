import { negocioDao } from "../dao/index.js";


export class NegocioService{
    static async getNegocios(){
        return await negocioDao.get()
    }

    static async getNegocioById(idNegocio){
        return await negocioDao.getBy({_id:idNegocio})
    }
    
    static async grabaNegocio(negocio){
        return await negocioDao.save(negocio)
    }
}

