import { ordenDao } from "../dao/index.js";


export class OrdenService{
    static async getOrdenes(){
        return await ordenDao.get()
    }

    static async grabaOrden(orden){
        return await ordenDao.save(orden)
    }
}

