// import mongoose from 'mongoose'

// const juguetesColeccion='juguetes'
// const juguetesEsquema=new mongoose.Schema({
//     nombre: String, precio: Number
// })

// export const juguetesModelo=mongoose.model(juguetesColeccion, juguetesEsquema)

export const juguetesDef={
    coleccion:'juguetes',
    esquema:{
        nombre:String, precio:Number
    }
}