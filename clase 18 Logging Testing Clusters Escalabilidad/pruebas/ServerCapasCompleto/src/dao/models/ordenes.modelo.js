import mongoose from "mongoose";

const ordenesColeccion='ordenes'
const ordenesEsquema=new mongoose.Schema({
    numeroOrden:Number,
    usuario:{
        type: mongoose.Types.ObjectId,
        ref: 'usuarios'
    },
    negocio:{
        type: mongoose.Types.ObjectId,
        ref: 'negocios'
    }, 
    productos: {type: Array},
    importe: Number
},{ 
    timestamps:{
        createdAt:'Fecha de Alta',
        updatedAt:'Fecha Útlima Modificación'
    }
}) 

export const ordenesModelo=mongoose.model(ordenesColeccion, ordenesEsquema)