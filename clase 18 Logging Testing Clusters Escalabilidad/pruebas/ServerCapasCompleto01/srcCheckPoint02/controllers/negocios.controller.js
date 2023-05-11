import MisRespuestas from "../utils/customResponses.js"


const getNegocios=async(req, res)=>{
    // lógica de negocio

    MisRespuestas.respuestaExitosa(res, 'Todo OK para negocios...!!!')
}

const createNegocio=async(req,res)=>{


    MisRespuestas.respuestaAltaExitosa(res, 'negocioCreado')
}


export default {getNegocios, createNegocio}