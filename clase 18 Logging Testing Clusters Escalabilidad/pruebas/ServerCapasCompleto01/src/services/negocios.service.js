import { negocioDao } from "../dao/index.js";


export class NegocioService{
    static async getNegocios(){
        return await negocioDao.get()
    }

    static async getNegociosById(id){
        return await negocioDao.getBy({_id:id})
    }

    static async grabaNegocio(negocio){
        return await negocioDao.save(negocio)
    }
}

