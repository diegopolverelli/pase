import winston from 'winston'
import { config } from '../config/config.js';

const { combine, timestamp, label, printf } = winston.format;

// const myFormat = printf(({ level, message, label, timestamp }) => {
//     return `${timestamp} [${label}] ${level}: ${message}`;
//   });

const customLevelOptions={
    levels:{
        critico: 0,
        aviso: 1,
        info: 2
    },
    colors:{
        critico: 'red',
        aviso: 'yellow',
        info: "green"
    }
}

const logger=winston.createLogger(
    {
        // format: combine(
        //     label({ label: 'right meow!' }),
        //     timestamp(),
        //     myFormat
        //   ),
        levels:customLevelOptions.levels,
        transports: [
            new winston.transports.Console(
                {
                    level:'info',
                    format: winston.format.combine(
                        timestamp(),
                        winston.format.colorize({colors: customLevelOptions.colors}),
                        winston.format.simple()
                        // winston.format.prettyPrint()
                    )
                }
            ),
            new winston.transports.File(
                {
                    filename:"./src/log.log", 
                    level: "info",
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        // winston.format.colorize({colors: customLevelOptions.colors}),
                        winston.format.prettyPrint(),
                    )

                }),
            // new winston.transports.File({filename:"./src/log.log", level:"silly"}),
        ]
    }
)


// const logger=winston.createLogger(
//     {
//         transports: [
//             new winston.transports.Console({level:process.env.ENTORNO=='PRODUCCION'?'warn':'silly'}),
//             new winston.transports.File({filename:"./src/log.log", level: "silly"}),
//             // new winston.transports.File({filename:"./src/log.log", level:"silly"}),
//         ]
//     }
// )

export const addLogger=(req, res, next)=>{
    req.logger = logger;
    req.logger.info(`Info: ${req.method} en ${req.url}`)
    next()
}