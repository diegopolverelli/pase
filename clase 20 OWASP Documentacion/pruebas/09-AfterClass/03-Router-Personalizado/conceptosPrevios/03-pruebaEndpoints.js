import express from 'express';

const app=express();
app.listen(3000,()=>console.log("Servidor escuchando el puerto 3000"));

const f1=(req, res, next)=>{
    console.log('Esta es la función 1')
    next();
}

const f2=(req, res, next)=>{
    console.log('Esta es la función 2')
    next();
}

const f3=(req, res, next)=>{
    console.log('Esta es la función 3')
    next()
}

const f4=(req, res)=>{
    console.log('Esta es la función 4')
    res.send('Esta es la funcion 4...!!!')
}

let arreglo=[f1,f2,f3,f4];

app.get('/',arreglo)




app.get('/1',[f1,f2,f3,f4])




const creaArregloFunciones=(arrayFunciones)=>{
    return arrayFunciones.map(funcion=>(...params)=>{
        funcion.apply(this, params);
    })
}

console.log(arreglo);
console.log('Resultado de creaArregloFunciones: ',creaArregloFunciones(arreglo));

app.get('/2',creaArregloFunciones(arreglo))

