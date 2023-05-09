import { negocioDao } from "../dao/index.js";


export class negocioService{
    static async getNegocios(){
        return await negocioDao.get()
    }
    
    static async grabaNegocio(negocio){
        return await negocioDao.save(negocio)
    }
}

