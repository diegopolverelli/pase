import { MiRouter } from "./router.js";
import jwt from 'jsonwebtoken';


const m1=(req,res,next)=>{
    console.log(`Pasó por middleware 1...!!!`)
    next()
}

const m2=(req,res,next)=>{
    console.log(`Pasó por middleware 1...!!!`)
    req.cliente='Cliente 001'
    next()
}

const m3=(req,res,next)=>{
    console.log(`Pasó por middleware 1...!!!`)
    next()
}

export class UsuariosRouter extends MiRouter{
    init(){
        this.get('/login',['PUBLIC'],m1,m2,m3,(req,res)=>{
            let usuario={
                nombre:'Juan', rol:'usuario'
            }

            let token=jwt.sign({usuario},'miPalabraSecreta')

            res.success2(`Login correcto`,token)
        })


        this.get('/',['PUBLIC'],(req,res,next)=>{
            console.log('mid 1...')
            next();
        },m1,m2,m3,(req,res)=>{

            if(req.cliente) console.log(req.cliente)
            res.success(`FUNCIONO TODO...!!!`)
        })

        this.get('/datos',['ADMIN'],(req,res)=>{
            let user={
                nombre:'Juan', edad:28
            }
            res.success2(`Mis datos...!!!`,user)
        })

        this.get('/error',['ADMIN', 'USUARIO'],(req,res)=>{
            res.errorCliente(`Error en datos...`)
        })

        this.get('/datos2',['ADMIN', 'USUARIO'],(req,res)=>{
            res.success(`Datos2 funciona OK...!!! `)
        })


        // this.post()

    }
}