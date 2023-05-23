
class ErrorPersonalizado extends Error{
    constructor(mensaje, codigoStatus){
        super(mensaje)
        this.status=codigoStatus
    }
}

const Errores={
    notFound:new ErrorPersonalizado('Recurso no encontrado',404),
    unauthorized: new ErrorPersonalizado('No tiene privilegios suficientes para acceder al recurso',403)
}


try {
    throw Errores.notFound
} catch (error) {
    if (error instanceof ErrorPersonalizado){
        console.log(error.message, error.status)
    }else{
        console.log('ha ocurrido un error inesperado')
    }
}


const midError=(error, req, res, next)=>{
    if(error){
        if (error instanceof ErrorPersonalizado){
            logger.error({name:error.name, message:error.message, status:error.status, detalle:error.stack})
            res.status(error.status).send(error.message)
        }else{
            logger.error('ha ocurrido un error inesperado', error. stack)
            res.status(500).send('ha ocurrido un error inesperado')
        }
   
    }else{
        next()
    }
}

const express=require('express')
const winston=require('winston')
const helmet = require('helmet');






const logger=winston.createLogger(
    {
        transports:[
            new winston.transports.File({
                filename:'./errores2.log',
                format:winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint(),
                ),
                level:'error'
            }),
            // new winston.transports.Console({
            //     format:winston.format.simple(),
            //     level:'info'
            // })

        ]
    }
)

const app=express()

// Configurar CSP usando Helmet
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      // Aquí puedes agregar más directivas según tus necesidades
    }
  }));
  
  

app.get('/error',(req,res)=>{
    if(req.query.flag){
        if(req.query.flag==1){
            throw Errores.unauthorized
        }
        if(req.query.flag==100){
            throw new Error()
        }
    }
    res.status(200).send('Todo Ok por acá...!!!')
})



app.use(midError)

app.listen(3000,()=>console.log('Server OK'))