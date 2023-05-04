import zlib from 'zlib';
import express from 'express'

const app = express()
app.listen(3000, () => { console.log('Escuchando puerto 3000') })

let prueba='Hola... esta es una prueba de ZLIB, GZIP SINCRONO...!!!'
for(let i=0;i<1000;i++){
    prueba+='Hola... esta es una prueba de ZLIB, GZIP SINCRONO...!!!'
}
let comprimido=zlib.gzipSync(prueba)
console.log("Comprimido: ",comprimido)
let descomprimido=zlib.gunzipSync(comprimido)
console.log("Descomprimido: ",descomprimido)

console.log("Descomprimido: ",descomprimido.toString())

app.get('/prueba',(req,res)=>{

    
    res.set('Content-type', 'text/plain')
    res.set('Content-Encoding', 'Gzip');
    res.send(comprimido)

})


// Función para comprimir datos utilizando zlib
const compressData = (data) => {
    return new Promise((resolve, reject) => {
        // zlib.deflate(data, (error, compressedData) => {
        zlib.gzip(data, (error, compressedData) => {

            if (error) {
                reject(error);
            } else {
                resolve(compressedData);
            }
        });
    });
};

// Función para descomprimir datos utilizando zlib
// const decompressData = (compressedData) => {
//   return new Promise((resolve, reject) => {
//     zlib.inflate(compressedData, (error, decompressedData) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(decompressedData);
//       }
//     });
//   });
// };

// Función para descomprimir datos utilizando zlib
const decompressData = (compressedData) => {
    return new Promise((resolve, reject) => {
        zlib.unzip(compressedData, (error, decompressedData) => {
            if (error) {
                reject(error);
            } else {
                resolve(decompressedData.toString());
            }
        });
    });
};


// Ejemplo de uso
// const originalData = 'Hola, este es un ejemplo de compresión con zlib';
// console.log('Datos originales:', originalData);

// compressData(originalData)
//   .then((compressedData) => {
//     console.log('Datos comprimidos:', compressedData);

//     return decompressData(compressedData);
//   })
//   .then((decompressedData) => {
//     console.log('Datos descomprimidos:', decompressedData);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });


app.get('/', async (req, res) => {
    let texto = 'PRUEBA DE ENVÍO DE DATOS...!!!'
    let comprimido = await compressData(texto)
    console.log(comprimido)

    res.set('Content-type', 'text/plain')
    res.set('Content-Encoding', 'Gzip');
    res.send(comprimido)
})