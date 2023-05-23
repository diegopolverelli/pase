import fs from 'fs';
import os from 'os';

export const errorMiddleware=(error, req, res, next)=>{
    if(error){

        let log='';
        if(fs.existsSync('./errores.log')){

            log=`\n\n${new Date().toUTCString()} - ${os.hostname()} - ${error.descrip}}`
            fs.appendFileSync('./errores.log',log)
        }else{
            log=`${new Date().toUTCString()} - ${os.hostname()} - ${error.descrip}}`
            fs.writeFileSync('./errores.log',log)
        }

        console.log(error.descrip)
        return res.status(error.codigo).json({mensaje:error.message})      
    }

    next();
}