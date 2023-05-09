import MisRespuestas from "../utils/customResponses.js"


const getAllUser=async(req, res)=>{
    // lógica de negocio

    MisRespuestas.respuestaExitosa(res, 'Todo OK para usuarios...!!!')
}

const createUser=async(req,res)=>{


    MisRespuestas.respuestaAltaExitosa(res, 'usuarioCreado')
}


export default {getAllUser, createUser}