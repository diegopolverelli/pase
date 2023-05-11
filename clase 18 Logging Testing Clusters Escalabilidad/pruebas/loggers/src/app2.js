import winston from 'winston';


const verboseOnlyFilter = winston.format((log) => {
    // console.log(log)

    if (log.level === 'verbose') {
        log.message+=` - LOG DIEGO POLVERELLI`
      return log;
    }
  });

const infoOnlyFilter = winston.format((log) => {
    if (log.level === 'info') {
        log.message+=` - LOG DIEGO POLVERELLI`
      return log;
    }
  });

const logger=winston.createLogger(
    {
        // format: winston.format.combine(
        //     infoOnlyFilter(),
        //     winston.format.colorize(
        //         {
        //             colors: {info:'blue',warning:'yallow', error:'red'}
        //         }
        //     ),
        //     winston.format.simple()
        // ),
        transports: [
            new winston.transports.Console(
                {
                    level:'silly',
                    format: winston.format.combine(
                    verboseOnlyFilter(),
                    winston.format.colorize(
                        {
                            colors: {info:'blue',warning:'yallow', error:'red', verbose:'green'}
                        }
                    ),
                    winston.format.simple()
       
                )}                
            ),
            new winston.transports.Console({
                level:'silly',
                format: winston.format.combine(
                infoOnlyFilter(),
                winston.format.timestamp(),
                winston.format.colorize(
                    {
                        colors: {info:'blue',warning:'yallow', error:'red'}
                    }
                ),
                winston.format.simple()
   
            )}),
            new winston.transports.File(
                {
                    filename:'./src/app2Errores.log',
                    level:'error',
                    format: winston.format.combine(
                    // verboseOnlyFilter(),
                    winston.format.timestamp(),
                    winston.format.simple()
       
                )}                
            ),

        ]
    }
)

console.log('Hola')
logger.verbose('este es un mensaje de tipo verbose')
logger.info('este es un mensaje de informacion')
logger.error('este es un mensaje de error')
logger.warn('este es un mensaje warning')