import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';
import { usuarioModelo } from '../models/usuarios.modelo.js';
import bcrypt from 'bcrypt';

// import jwt from 'jsonwebtoken';
import { config } from './config.js';

const extraeToken=(req)=>{
    let token=null;
    if(req.cookies.codertoken) {
        // console.log('Leyo desde passport la cookie')
        token=req.cookies.codertoken;
    }

    return token
}

export const inicializaEstrategias=()=>{

    passport.use('registro',new passportLocal.Strategy(
        {passReqToCallback:true},
        async(req,username,password,done)=>{
            try {
                // console.log('hola 1')
                if(!req.body.apellido || !req.body.nombre || !req.body.dni || !req.body.email) return done(null, false, {message:'Faltan datos...!!!', messages:'Faltan datos'})
                // console.log('hola 2',username)
                let usuario=await usuarioModelo.findOne({username:username})
                if(usuario) return done(null, false, {message:`El username ${username} ya existe en la DB`})

                usuario=await usuarioModelo.findOne({dni:req.body.dni})
                if(usuario) return done(null, false, {message:`El dni ${req.body.dni} ya existe en la DB`})

                usuario=await usuarioModelo.findOne({email:req.body.email})
                if(usuario) return done(null, false, {message:`El email ${req.body.email} ya existe en la DB`})

                // console.log('hola 3')

                let usuarioAGrabar={
                    nombre:req.body.nombre,
                    apellido:req.body.apellido,
                    username, 
                    dni: req.body.dni, 
                    email: req.body.email,
                    password:bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                    rol:'642c1c4cc2c616692308e74e'
                }
                usuario=await usuarioModelo.create(usuarioAGrabar)
                done(null,usuario)

            } catch (error) {
                done(error)
            }
        }
    ))

    passport.use('login', new passportLocal.Strategy(
        {},
        async(username, password, done)=>{

            try {
                let usuario=await usuarioModelo.findOne({username:username})

                if(!usuario) return done(null, false)
    
                if(!bcrypt.compareSync(password, usuario.password)) return done(null, false)
    
                console.log(`Usuario ${usuario.username} autenticado con Passport...!!!`)
                done(null, usuario)
            } catch (error) {
                done(error)                
            }

        }
    ))

    passport.use('jwt', new passportJWT.Strategy(
        {
            jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([extraeToken]),
            secretOrKey: config.SECRET
        },
        (contenidoToken, done)=>{
            // console.log('pass jwt')
            try {
                done(null,contenidoToken.usuario)
            } catch (error) {
                done(error)
            }
        }
    ))


}