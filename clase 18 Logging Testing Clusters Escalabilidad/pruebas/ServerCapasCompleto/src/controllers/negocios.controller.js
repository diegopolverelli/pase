import { NegocioService } from "../services/negocios.service.js"
import MisRespuestas from "../utils/customResponses.js"


const getNegocios=async(req, res)=>{
    // lógica de negocio
    let negocios=await NegocioService.getNegocios()

    MisRespuestas.respuestaExitosa(res, negocios)
}

const createNegocio=async(req,res)=>{
    let {nombre, productos} = req.body

    if(!nombre || !productos) return MisRespuestas(res, 'Faltan datos...!!!')

    let negocio={
        nombre, productos
    }

    let negocioCreado=await NegocioService.grabaNegocio(negocio)

    MisRespuestas.respuestaAltaExitosa(res, negocioCreado)
}


export default {getNegocios, createNegocio}