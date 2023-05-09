import mongoose from "mongoose";

import {config} from '../config/config.js'

import { Usuario } from "./daoUsuariosMongo.js";
import { Orden } from "./daoOrdenesMongo.js";
import { Negocio } from "./daoNegociosMongo.js";


try {
    await mongoose.connect(config.database.MONGOURL,{
        dbName:config.database.DB
    })
    console.log('Conectato a DB')
} catch (error) {
    console.log(error)
}

export const usuarioDao=new Usuario();
export const ordenDao=new Orden();
export const negocioDao=new Negocio();

