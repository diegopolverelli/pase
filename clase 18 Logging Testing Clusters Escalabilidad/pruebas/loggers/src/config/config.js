import dotenv from  'dotenv'

dotenv.config({path:'./src/.env'})


export const config={
    app:{
        ENTORNO:process.env.ENTORNO||'DESARROLLO',
        PORT:process.env.PORT||8080
    },
    database:{

    }
}