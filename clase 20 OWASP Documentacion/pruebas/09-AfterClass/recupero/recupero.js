import express from 'express'
import jwt from 'jsonwebtoken'
import mailer from 'nodemailer'
import bcrypt from 'bcrypt'
import handlebars from 'express-handlebars';

const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars',handlebars.engine());
app.set('views','./views');
app.set('view engine','handlebars');

const MailService=mailer.createTransport(
    {
        service:'gmail',
        port: 587,
        auth:{
            user: 'diegopolverelli@gmail.com',
            pass: 'jvncumjsxcxemwcl'
        }
    }
)

const usuarios=[
    {
        email:'test1@test.com',
        password: bcrypt.hashSync('123',bcrypt.genSaltSync(10))
    },
    {
        email:'test2@test.com',
        password: bcrypt.hashSync('123',bcrypt.genSaltSync(10))
    },
    {
        email:'diegopolverelli@hotmail.com',
        password: bcrypt.hashSync('123',bcrypt.genSaltSync(10))
    },

]

app.get('/recupero',(req,res)=>{
    res.render('reset')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',(req,res)=>{
    let {email, password}=req.body
    if(!email || !password) return res.send('Error, faltan datos...!!!')
    console.log(email, password)
    let existe=usuarios.find(u=>u.email==email)
    if (!existe) return res.send('Error, usuario inexistente')
    console.log(existe)
    if(!bcrypt.compareSync(password, existe.password)) return res.send('Credenciales incorrectas')
    console.log('Login OK')
    res.send('Login OK')
})

app.post('/recupero',(req,res)=>{

    let {email}=req.body
    if(!email) return res.send('faltan datos')
    let existe=usuarios.find(u=>u.email==email)
    if(!existe) return res.send('usuario invalido')

    const token = jwt.sign({user:email},'miPalabraSecreta',{expiresIn:'1h'})

    MailService.sendMail({
        from:'Servidor Backend Coderhoyse<diegopolverelli@gmail.com>',
        to:email,
        subject:'Recupero de contraseña',
        html:`<h2>Recupero de contraseña:</h2>
        <p>Haga click en el siguiente link</p>
        <a href='http://localhost:3000/generaNuevaClave?token=${token}'>Recupero contraseña para ${email}</a>
        <br>
        <p>Tienes una hora antes de que el link expire. </p>`
    })

    res.send('Revise su casilla de correos, y siga las instrucciones')

})

app.get('/generaNuevaClave',(req,res)=>{
    let token=null
    if(req.query.token){
        token=req.query.token
    }else{
        return res.send('Error')
    }

    let usuario;
    try {
        let usuario=jwt.verify(token,'miPalabraSecreta')
        console.log(usuario)
        
        res.render('generaClave',{usuario:usuario.user})
    } catch (error) {
        console.log(error.name)        
        if(error.name=='JsonWebTokenError'){
            return res.send('Token invalido o inexistente')
        }
        if(error.name=='TokenExpiredError'){
            return res.send('Token expirado')
        }
    }

})

app.post('/clave',(req,res)=>{
    let {password, email}=req.body

    console.log(req.body)

    if (!password || !email) return res.send('Error. Vuelva a generar el proceso')

    console.log(password, email)
    let indice=usuarios.findIndex(u=>u.email==email)
    if(indice==-1) return res.send('Error. No existe usuario')
    usuarios[indice].password=bcrypt.hashSync(password,bcrypt.genSaltSync(10))

    res.send('Contraseña regenerada...!!!')

})

app.listen(3000,()=>console.log('Server OK'))