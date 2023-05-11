import winston from 'winston'

const filtro=winston.format((log)=>{
    if(log.level=='verbose'){
        return log
    }
})

const filtro1=winston.format((log)=>{
    if(log.level=='info'){
        return log
    }
})


const logger=winston.createLogger(
    {
        transports:[
            new winston.transports.Console(
                {
                    level:'verbose',
                    format: winston.format.combine(
                        filtro(),
                        winston.format.simple()
                    )
                }
            ),
            new winston.transports.Console(
                {
                    level:'verbose',
                    format: winston.format.combine(
                        filtro1(),
                        winston.format.simple()
                    )
                }
            ),
            new winston.transports.File(
                {   filename: './src/log1.txt',
                    level:'verbose',
                    format: winston.format.combine(
                        winston.format.colorize({colors:{info:'blue', warning:'yellow',verbose:'green', error:'red'}}),
                        winston.format.prettyPrint()
                    )
                    
                }
            ),
            new winston.transports.File(
                {   filename: './src/ERRORES.txt',
                    level:'error',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        // winston.format.colorize({colors:{info:'blue', warning:'yellow',verbose:'green', error:'red'}}),
                        winston.format.simple()
                    )
                    
                }
            )



        ]
    }
)


logger.verbose('Hola, soy un mensaje verbose')
logger.warn('Hola, soy un mensaje warning')
logger.error('Hola, soy un mensaje error')
logger.info('Hola, soy un mensaje de informacion')
