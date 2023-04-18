import { UsuariosService } from "../services/usuarios.service.js";

let usuariosService=new UsuariosService();

const getUsuarios=async(req, res)=>{

    let usuarios=await usuariosService.getUsuarios({})
    res.status(200).send({usuarios})
}

const creaUsuario=async(req, res)=>{

    let usuarioGuardado=await usuariosService.grabaUsuario({
        nombre:req.body.nombre.toUpperCase(),
        apellido:req.body.apellido.toUpperCase()
    })

    res.status(201).send({usuarioGuardado})
}

export default {
    getUsuarios, creaUsuario
}