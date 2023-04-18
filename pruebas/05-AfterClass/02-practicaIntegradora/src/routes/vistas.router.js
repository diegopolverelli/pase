import { usuarioModelo } from '../models/usuarios.modelo.js'
import { rolesModelo } from '../models/roles.model.js';
import {MiRouter} from './router.js'

export class VistasRouter extends MiRouter{
    init(){
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

        this.get('/socios',['USUARIO-SOCIO','ADMINISTRADOR'],(req,res)=>{
            res.send('Página de socios')
        })

        this.get('/usuarios',['USUARIO','ADMINISTRADOR'],(req,res)=>{
            res.send('Página de usuarios')
        })


    } // cierra init()
} // cierra clase