import dotenv from 'dotenv';

dotenv.config()

export const config={
    app:{
        PUERTO:process.env.PUERTO,
        PERSISTENCIA:process.env.PERSISTENCIA
    },
    database:{
        MONGOURL:process.env.MONGOURL,
        DB:process.env.DB
    }
}