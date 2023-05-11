import mongoose from 'mongoose';

const usuariosColeccion='usuarios';
const usuariosEsquema=new mongoose.Schema({
    nombre: String, correo: String, rol: String, 
    pedidos:[
        {
            nroPedido:{
                type: mongoose.Types.ObjectId,
                ref: 'ordenes'
            }
        }
    ]
},{ 
    timestamps:{
        createdAt:'Fecha de Alta',
        updatedAt:'Fecha Útlima Modificación'
    }
})

export const usuariosModelo=mongoose.model(usuariosColeccion, usuariosEsquema)