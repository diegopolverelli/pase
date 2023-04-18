

const f2=async()=>'hola'

// console.log(await f2())

let respuesta = await f2()
console.log(respuesta)

const f3=async()=>{
    let respuesta = await f2()
    console.log(respuesta)
}


// await console.log('hola')



// const f3=()=>{
//     await console.log('chau')
// }

