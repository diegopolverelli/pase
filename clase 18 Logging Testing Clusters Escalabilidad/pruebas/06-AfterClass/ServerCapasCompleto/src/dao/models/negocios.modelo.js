import mongoose from "mongoose";

const negociosColeccion='negocios'
const negociosEsquema=new mongoose.Schema({
    nombre:String, 
    productos: [
        {
            id:Number, descrip: String, precio:Number
        }
    ]
},{ 
    timestamps:{
        createdAt:'Fecha de Alta',
        updatedAt:'Fecha Útlima Modificación'
    }
}) 

export const negociosModelo=mongoose.model(negociosColeccion, negociosEsquema)