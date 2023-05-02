import compression from 'express-compression'
import express from 'express'
import {faker} from '@faker-js/faker'

faker.locale='es'

let texto=faker.lorem.paragraphs(10000, '<br/>\n')

// console.log(texto)


const app=express()

// app.use(compression({
//     brotli: {
//       enabled: true,
//     //   zlib: {
//     //     level: 9, // Establecer el nivel de compresión (1 al 9)
//     //     chunkSize: 16 * 1024, // Tamaño del búfer de compresión
//     //     memLevel: 8 // Nivel de memoria para la compresión
//     //   }
//     }
//   }));
  
// app.use(compression({
//     brotli:{enabled:true, zlib:{}}
// }))

// app.use(compression());

app.use(compression({
    brotli:{enabled:true}
  }));
  

app.listen(3000,()=>console.log("Server listening"))

app.get('/',(req, res)=>{
    res.send(texto)
})