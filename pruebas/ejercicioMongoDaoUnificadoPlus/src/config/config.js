import dotenv from 'dotenv'

dotenv.config({
    path:'./src/.env'
})

export const config={
    app:{
        PERSISTENCIA:process.env.PERSISTENCIA||'MONGO',
        PORT:process.env.PORT||3000
    },
    dataBase:{
        MONGOURL:process.env.MONGOURL,
        DB:'clase15'
    }
}