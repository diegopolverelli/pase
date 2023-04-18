import dotenv from 'dotenv';

dotenv.config({path:'./src/.env'})

export const config={
    app:{
        PORT:process.env.PORT||3000,
        SECRET:process.env.SECRET||'miPalabraSecreta',
    },
    Database:{
        MONGOURL:process.env.MONGOURL||'mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority',
        DB:process.env.DB
    }
}