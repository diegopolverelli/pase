import { NegocioService } from "../services/negocios.service.js"
import { OrdenesService } from "../services/ordenes.service.js"
import { UsuariosService } from "../services/usuarios.service.js"
import MisRespuestas from "../utils/customResponses.js"


const getOrdenes=async(req, res)=>{
    // lógica de negocio
    let ordenes=await OrdenesService.obtenerOrdenes()

    MisRespuestas.respuestaExitosa(res, ordenes)
}

const createOrden=async(req,res)=>{
    let {idUsuario, idNegocio, pedido} = req.body
    if(!idUsuario || !idNegocio || !pedido) return MisRespuestas.errorCliente(res, 'Faltan datos')

    let usuario=await UsuariosService.getUsuarioById(idUsuario)
    if(!usuario) return MisRespuestas.errorCliente(res, 'Usuario Inexistente')

    let negocio=await NegocioService.getNegocioById(idNegocio)
    if(!negocio) return MisRespuestas.errorCliente(res, 'Negocio Inexistente')

    console.log(negocio)

    let detalle=[]
    
    pedido.forEach(i=>{
        let item=negocio.productos.find(p=>p.id==i.id)
        if(item){
            detalle.push({
                id:i.id,
                descrip:item.descrip,
                precio:item.precio,
                cantidad:i.cantidad
            })
        }
    })

    let orden={
        usuario:idUsuario,
        negocio:idNegocio, 
        productos:detalle,
        importe:detalle.reduce((acum,actu)=>acum+actu.precio*actu.cantidad,0)
    }

    orden=await OrdenesService.grabaOrden(orden)

    usuario.pedidos.push({
        nroPedido:orden._id
    })

    await UsuariosService.grabaUsuario(usuario)

    MisRespuestas.respuestaAltaExitosa(res, orden)
}


export default {getOrdenes, createOrden}