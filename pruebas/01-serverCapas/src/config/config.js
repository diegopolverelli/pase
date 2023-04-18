import dotenv from 'dotenv'

dotenv.config({
    path:'./src/.env'
})

export const config={
    app:{
        PERSISTENCIA:process.env.PERSISTENCIA||'MONGO',
        PUERTO:process.env.PORT||3000
    },
    database:{
        MONGOURL:process.env.MONGOURL||'mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority',
        DB:process.env.DB||'test'
    }
}