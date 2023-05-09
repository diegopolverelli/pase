import dotenv from 'dotenv'

dotenv.config({
    path:'./src/.env'
})

export const config={
    app:{
        PORT:3000,
        PERSISTENCIA: 'MONGO'
    },
    database:{
        MONGOURL: 'mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority',
        DB: 'afterClass06'
    }
}