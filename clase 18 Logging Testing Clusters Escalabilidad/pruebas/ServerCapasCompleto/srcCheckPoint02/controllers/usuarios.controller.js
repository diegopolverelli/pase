import { usuarioDao } from "../dao/index.js"
import MisRespuestas from "../utils/customResponses.js"


const getAllUser=async(req, res)=>{
    // lógica de negocio
    let usuarios=await usuarioDao.get()

    MisRespuestas.respuestaExitosa(res, usuarios)
}

const createUser=async(req,res)=>{


    MisRespuestas.respuestaAltaExitosa(res, 'usuarioCreado')
}


export default {getAllUser, createUser}