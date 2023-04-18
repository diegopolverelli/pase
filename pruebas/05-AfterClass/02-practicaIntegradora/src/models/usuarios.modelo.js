import {Schema, model} from "mongoose";
import paginate from 'mongoose-paginate-v2'


const usuarioColeccion='usuarios'
const usuarioEsquema=new Schema({
    nombre: String, apellido: String,
    username: {type: String, unique:true},
    email: {type: String, unique:true},
    dni: {type: Number, unique:true},
    password: String,
    rol:{
        type: Schema.Types.ObjectId,
        ref: 'roles'
    }
},{
    timestamps:true
})

usuarioEsquema.plugin(paginate);

usuarioEsquema.pre('find',function(){
    this.populate('rol')
})

usuarioEsquema.pre('findOne',function(){
    this.populate('rol')
})

export const usuarioModelo=model(usuarioColeccion,usuarioEsquema);