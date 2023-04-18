import { juguetesService } from "../services/juguetes.service.js"

const getJuguetes=async(req, res)=>{

    // let juguetes='juguetes'
    let juguetes=await juguetesService.getJuguetes();

    res.send(juguetes)
}

const grabaJuguete=async(req, res)=>{

    // validaciones
    if(!req.body.nombre || !req.body.precio) throw new Error(`Faltan datos`)

    // validar formatos
    let nombre=req.body.nombre.toUpperCase()

    let juguete={
        nombre,
        precio:req.body.precio
    }

    // grabar
    
    try {
        let jugueteGuardado=await juguetesService.grabaJuguete(juguete)
        res.send({jugueteGuardado})
    } catch (error) {
        console.log(error)
        return res.send('Error al grabar juguete')
    }


}

export default {
    getJuguetes, grabaJuguete
}