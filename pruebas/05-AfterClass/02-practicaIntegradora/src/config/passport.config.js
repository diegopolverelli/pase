import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local'
import { config } from './config.js';
import { usuarioModelo } from '../models/usuarios.modelo.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const extraeToken=(req)=>{
    let token=null;
    if(req.cookies.codertoken) {
        console.log('Leyo desde passport la cookie')
        token=req.cookies.codertoken;
    }

    return token
}

export const inicializaEstrategias=()=>{

    passport.use('login', new passportLocal.Strategy({

    },async(username, password, done)=>{
        // let {username, password} = req.body
        // if(!username || !password) return res.errorCliente('Faltan datos')

        try {
            let usuario=await usuarioModelo.findOne({username:username})

            if(!usuario) return done(null, false) //res.errorAutenticacion(`No existe el usuario ${username} en BD`)
    
            if(!bcrypt.compareSync(password, usuario.password)) return done(null,false) // res.errorAutenticacion(`Clave invalida`)
    
            usuario={
                nombre:usuario.nombre, apellido:usuario.apellido, rol:usuario.rol.nombre
            }
            console.log('Login de passport en acción...!!!')
            done(null, usuario)
    
            // let token=jwt.sign({usuario},config.SECRET,{expiresIn:60*30})
    
            // res.cookie('codertoken',token,{maxAge:1000*60*30, httpOnly:true}).success2('Login OK',token)
                
        } catch (error) {
            done(error)            
        }

    }))

    passport.use('jwt', new passportJWT.Strategy(
        {
            jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([extraeToken]),
            secretOrKey: config.SECRET
        },
        (contenidoToken, done)=>{
            try {
                done(null,contenidoToken.usuario)
            } catch (error) {
                done(error)
            }
        }
    ))


}