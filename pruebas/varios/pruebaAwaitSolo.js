
const prueba2 = async () => {return 'hola'}

// const prueba3 = () => {
//     let Contacts;
//     let tipo = 1
//     if (tipo == 'MONGO') {
//         const { default: ContactMongo } = await import('./modulo.js')
//         Contacts = ContactMongo;

//         await prueba2()

//     } else {
//         const { default: ContactMemory } = await import('./modulo.js')
//         Contacts = ContactMemory;
//     }
// }

let Contacts;
let tipo = 'MONGO'
if (tipo == 'MONGO') {
    const { default: ContactMongo } = await import('./modulo.js')
    Contacts = ContactMongo;

    console.log(await prueba2())

} else {
    const { default: ContactMemory } = await import('./modulo.js')
    Contacts = ContactMemory;
}

console.log(prueba2())
console.log(await prueba2())