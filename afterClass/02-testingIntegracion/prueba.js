import mongoose from "mongoose";

console.log('Hola')
await mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase21')

let modelo=mongoose.model('users',new mongoose.Schema({
    first_name: String, last_name: String, email: String
}))

let resultado=await modelo.find();
console.log(Object.keys(resultado[0]))
console.log(Object.entries(resultado[0]))



let resultadoLean=await modelo.find().lean()

let conJson=resultado.map(u=>u.toJSON())
let conObject=resultado.map(u=>u.toObject())

console.log({
    conJson:conJson[0],
    conObject:conObject[0],
    resultadoLean:resultadoLean[0],
    resultado:resultado[0]
})

console.log({
    conJson:Object.entries(conJson[0]),
    conObject:Object.entries(conObject[0]),
    resultadoLean:Object.entries(resultadoLean[0]),
    resultado:Object.entries(resultado[0])
})


// console.log(JSON.stringify(resultadoLean)==JSON.stringify(conJson))
// console.log(JSON.stringify(resultadoLean)==JSON.stringify(conObject))
// console.log(JSON.stringify(resultado)===JSON.stringify(conObject))
// console.log(JSON.stringify(resultado)===JSON.stringify(conJson))
// console.log(JSON.stringify(resultado)===JSON.stringify(resultadoLean))

// console.log(Object.entries(resultadoLean))
// console.log(Object.entries(resultado))

const numeros = [1, 2, 3, 4, 5];

const duplicados = numeros.map(numero => numero * 2);

// console.log(duplicados); // Resultado: [2, 4, 6, 8, 10]
// console.log(numeros)

// console.log(Object.keys(resultado))
// console.log(Object.keys(resultadoLean))
// console.log(Object.keys(conJson))
// console.log(Object.keys(conObject))



  