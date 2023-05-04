import {fileURLToPath} from 'url';
import { dirname } from 'path';
import Zlib from 'zlib'

import express from 'express'
import compression from 'express-compression'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app=express()
app.listen(3000,()=>console.log("Server corriendo en puerto 3000"))


let texto='';
for (let i=1; i<=100000;i++){
    texto+=i.toString()+' - '
}


app.get('/1',(req,res)=>{
    res.send(texto)
})

app.get('/2',compression(),(req,res)=>{
    res.send(texto)
})

app.get('/3',compression({brotli:{enabled:true}}),(req,res)=>{
    res.send(texto)
})

app.get('/4',(req,res)=>{
    res.sendFile(__dirname+'/images/lio.jpg')
})

app.get('/5',compression({brotli:{enabled:true}}),(req,res)=>{
    res.sendFile(__dirname+'/images/lio.jpg')
})

app.get('/6',compression({zlib:{level: Zlib.constants.Z_BEST_SPEED, 
}}),(req,res)=>{
    res.send(texto)
})

app.get('/7',compression({zlib:{level: Zlib.constants.Z_BEST_COMPRESSION, 
}}),(req,res)=>{
    res.send(texto)
})


let comprimido=Zlib.brotliCompressSync(texto)
console.log(comprimido)
let descomprimido=Zlib.brotliDecompressSync(comprimido)
// console.log(descomprimido.toString())

// Comparación de propiedades
console.log("Longitud de comprimido Brotli:", comprimido.length);
console.log("Longitud de descomprimido:", descomprimido.length);

comprimido=Zlib.gzipSync(texto)
console.log(comprimido)
descomprimido=Zlib.gunzipSync(comprimido)
// console.log(descomprimido.toString())

// Comparación de propiedades
console.log("Longitud de comprimido Gzip:", comprimido.length);
console.log("Longitud de descomprimido:", descomprimido.length);

comprimido=Zlib.deflateSync(texto,{level:Zlib.constants.Z_BEST_SPEED, memLevel:Zlib.constants.Z_BEST_SPEED})
comprimido=Zlib.deflateSync(texto,{level:Zlib.constants.Z_BEST_COMPRESSION, memLevel:Zlib.constants.Z_BEST_COMPRESSION})
console.log(comprimido)
descomprimido=Zlib.inflateSync(comprimido)
// console.log(descomprimido.toString())

// Comparación de propiedades
console.log("Longitud de comprimido Deflate:", comprimido.length);
console.log("Longitud de descomprimido:", descomprimido.length);
