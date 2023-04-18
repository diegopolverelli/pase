import { JuguetesService } from "../services/juguetes.service.js";

let juguetesService=new JuguetesService();

const getJuguetes=async(req, res)=>{

    let juguetes=await juguetesService.getJuguetes({})
    res.status(200).send({juguetes})
}

const creaJuguete=async(req, res)=>{

    let jugueteGuardado=await juguetesService.grabaJuguete({
        nombre:req.body.nombre.toUpperCase(),
        apellido:req.body.apellido.toUpperCase()
    })

    res.status(201).send({jugueteGuardado})
}

export default {
    getJuguetes, creaJuguete
}