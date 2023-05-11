import { UsuariosService } from "../services/usuarios.service.js"
import MisRespuestas from "../utils/customResponses.js"


const getAllUser=async(req, res)=>{
    // lógica de negocio
    let usuarios=await UsuariosService.getUsuarios()

    MisRespuestas.respuestaExitosa(res, usuarios)
}

const createUser=async(req,res)=>{
    let {nombre, correo, rol} = req.body
    if(!nombre || !correo || !rol) return MisRespuestas.errorCliente(res, 'Faltan datos...!!!')

    let usuario=await UsuariosService.getUsuarioByEmail(correo)
    if(usuario) return MisRespuestas.errorCliente(res, `Ya existe un usuario con el email ${correo} en nuestra base de datos...!!!`)

    usuario={
        nombre, correo, rol, 
        ordenes:[]
    }

    let usuarioGrabado=await UsuariosService.grabaUsuario(usuario)

    MisRespuestas.respuestaAltaExitosa(res, usuarioGrabado)
}


export default {getAllUser, createUser}