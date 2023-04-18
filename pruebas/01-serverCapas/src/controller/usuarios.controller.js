import { usuariosService } from "../services/usuarios.service.js"

const getUsuarios=async(req, res)=>{

    // let usuarios='usuarios'
    let usuarios=await usuariosService.getUsuarios();

    res.send(usuarios)
}

const getUsuariosByNombre=async(req, res)=>{

    let filtro={
        nombre:req.params.nombre.toUpperCase()
    }
    let usuarios=await usuariosService.getUsuariosByNombre(filtro);

    res.send(usuarios)
}


const grabaUsuario=async(req, res)=>{

    // validaciones
    if(!req.body.nombre || !req.body.apellido) throw new Error(`Faltan datos`)

    // validar formatos
    let nombre=req.body.nombre.toUpperCase()
    let apellido=req.body.apellido.toUpperCase()


    let usuario={
        nombre,
        apellido
    }

    // grabar
    
    try {
        let usuarioGuardado=await usuariosService.grabaUsuario(usuario)
        res.send({usuarioGuardado})
    } catch (error) {
        console.log(error)
        return res.send('Error al grabar usuario')
    }


}

export default {
    getUsuarios, grabaUsuario,getUsuariosByNombre
}