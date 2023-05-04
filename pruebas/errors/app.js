import express from 'express';
import { CustomError } from './CustomError.js';
import errores from './errores.js';
import { generaErrorCliente } from './errorCliente.js';
import fs from 'fs'

const app = express()
app.listen(3000, () => { console.log("Server OK en puerto 3000") })

app.get('/:variable', (req, res) => {
    try {
        if (req.params.variable == 'error') {

            let cliente = { nombre: 'Juan', edad: 34 }

            CustomError.createError("Error prueba", generaErrorCliente(cliente), "Error de prueba...!!!", errores.FRONTEND_ERROR)
        } else {
            res.send('OK')
        }
    } catch (error) {
        console.log(error.causa)
        console.log(error.message)
        let fin=error.stack.indexOf(')')
        console.log(error.stack.substring(0,fin+1))

        if(fs.existsSync('./errores.log')){
            fs.appendFileSync('./errores.log',error.stack+'\n\n')
        }else{
            fs.writeFileSync('./errores.log',error.stack+'\n\n')
        }

        const aa='hola'
        aa.indexOf()
        res.send(error.message)
    }
})

app.get('/prueba/error1', (req, res) => {

    let cliente = { nombre: 'Juan', edad: 34 }
    CustomError.createError("Error prueba", generaErrorCliente(cliente), "Error de prueba...!!!", errores.FRONTEND_ERROR)


})

app.get('/prueba/error2', (req, res) => {

    let cliente = { nombre: 'Juan', edad: 34 }
    CustomError.createError("Error prueba", generaErrorCliente(cliente), "Error de prueba...!!!", errores.DATABASE_ERROR)


})



const handleErrors = (error, req, res, next) => {
    if (error) {
        switch (error.codigo) {
            case errores.DATABASE_ERROR:
                res.send({ status: 'error', descrip: 'error DB', mensaje: error.message })
                break;

            case errores.FRONTEND_ERROR:
                res.send({ status: 'error', descrip: 'error Cliente', mensaje: error.message })
                break;
    

            default:
                res.send({ status: 'error', mensaje: 'Error indeterminado' })
                break;
        }
    } else {
        next()
    }
}

app.get('/', (req, res) => {

    console.log(nombre1)

    res.send('Hola...!!!')
})

app.use(handleErrors)