import dotenv from 'dotenv';

dotenv.config({
    path:'./src/.env'
})


export const config={
    app:{
        PERSISTENCIA:process.env.PERSISTENCIA,
        PORT:process.env.PORT
    },
    dataBase:{
        MONGOURL:process.env.MONGOURL,
        DB:process.env.DB
    }
}