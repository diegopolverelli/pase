import { usuariosService } from "../services/usuarios.service.js";

const getUsuarios=async(req,res)=>{

    let usuarios=await usuariosService.getUsuarios()

    res.send({usuarios})
}

const grabaUsuario=async(req,res)=>{

    let usuarioGrabado=await usuariosService.grabaUsuario({
        nombre:req.body.nombre.toUpperCase(),
        apellido:req.body.apellido.toUpperCase()
    })
    res.send({usuarioGrabado})
}

export default { getUsuarios, grabaUsuario }