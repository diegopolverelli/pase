import { ordenDao } from "../dao/index.js";
import MisRespuestas from "../utils/customResponses.js";


export class OrdenesService{
    static async grabaOrden(orden){
        let ordenGrabada= await ordenDao.save(orden)
        return ordenGrabada
    }

    static async obtenerOrdenes(){
        return await ordenDao.get()
    }
}