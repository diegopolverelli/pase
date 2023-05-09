import MisRespuestas from "../utils/customResponses.js"


const getOrdenes=async(req, res)=>{
    // lógica de negocio

    MisRespuestas.respuestaExitosa(res, 'Todo OK para ordenes...!!!')
}

const createOrden=async(req,res)=>{


    MisRespuestas.respuestaAltaExitosa(res, 'ordeCreada')
}


export default {getOrdenes, createOrden}