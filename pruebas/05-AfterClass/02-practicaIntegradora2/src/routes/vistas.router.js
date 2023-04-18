import { usuarioModelo } from '../models/usuarios.modelo.js'
import { rolesModelo } from '../models/roles.model.js';
import {MiRouter} from './router.js'
import cors from 'cors'

const miCorsTrucho=(req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    next()
}

export class VistasRouter extends MiRouter{
    init(){
        this.get('/usuarios',['USUARIO','ADMINISTRADOR'],(req,res)=>{
            res.send('Hola usuario...!!!')
        })

        this.get('/socios',['USUARIO-SOCIO','ADMINISTRADOR'],(req,res)=>{
            res.send('Hola socio...!!!')
        })

        this.get('/',['PUBLIC'],async(req, res)=>{

            let paginaActual=1;
            if(req.query.pagina) paginaActual=req.query.pagina;

            let pagina=await usuarioModelo.paginate({},{limit:4, page:paginaActual});

            let {docs:usuarios, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage} = pagina

            // console.log(pagina)

            res.render('home',{
                usuarios, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage
            })
        })

        this.get('/login',['PUBLIC'],(req,res)=>{
            res.render('login')
        })

        this.get('/registro',['PUBLIC'],(req,res)=>{
            res.render('registro')
        })
    } // cierra init()
} // cierra clase