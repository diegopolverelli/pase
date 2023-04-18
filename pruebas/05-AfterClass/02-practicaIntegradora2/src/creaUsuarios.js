import mongoose from 'mongoose';
import { usuarioModelo } from './models/usuario.modelo.js';
import { rolModelo } from './models/rol.modelo.js';
import bcrypt from 'bcrypt';

let idAdmin='642c1c4cc2c616692308e74d'
let idUser='642c1c4cc2c616692308e74e'
let idSocio='642c1c4cc2c616692308e74f'

const generaHash=(password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const conectar=async()=>{
    try {
        await mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=practicaIntegradora2')
        console.log(`Conexión a DB establecida`)

        let users=await usuarioModelo.paginate({},{limit:5});
        console.log(users)
        let usuarios=users.docs
        
        console.log("USUARIOS 1:",usuarios[0].nombre, usuarios[0].apellido, usuarios[0].rol.nombre)
        console.log("USUARIOS 2:",usuarios[1].nombre, usuarios[1].apellido, usuarios[1].rol.nombre)
        console.log("USUARIOS 3:",usuarios[2].nombre, usuarios[2].apellido, usuarios[2].rol.nombre)

        // let usuarios=[
        //     {
        //         nombre:'Diego', apellido:'Polverelli',
        //         dni:10109001,
        //         rol:idAdmin,
        //         password:generaHash('123'),
        //         username:'diegopolverelli',
        //         email:'diegopolverelli@hotmail.com'
        //     },
        //     {
        //         nombre:'Juan Martin', apellido:'Pereyra',
        //         dni:10109002,
        //         rol:idUser,
        //         password:generaHash('123'),
        //         username:'juan',
        //         email:'juan@test.com'
        //     },
        //     {
        //         nombre:'Mariana', apellido:'Barrios',
        //         dni:10109003,
        //         rol:idSocio,
        //         password:generaHash('123'),
        //         username:'mariana',
        //         email:'mariana@test.com'
        //     },
        //     {
        //         nombre:'test1', apellido:'test1',
        //         dni:10109004,
        //         rol:idUser,
        //         password:generaHash('123'),
        //         username:'test1',
        //         email:'test1@test.com'
        //     },
        //     {
        //         nombre:'test2', apellido:'test2',
        //         dni:10109005,
        //         rol:idUser,
        //         password:generaHash('123'),
        //         username:'test2',
        //         email:'test2@test.com'
        //     },
        //     {
        //         nombre:'test3', apellido:'test3',
        //         dni:10109006,
        //         rol:idUser,
        //         password:generaHash('123'),
        //         username:'test3',
        //         email:'test3@test.com'
        //     },
        //     {
        //         nombre:'test4', apellido:'test4',
        //         dni:10109007,
        //         rol:idUser,
        //         password:generaHash('123'),
        //         username:'test4',
        //         email:'test4@test.com'
        //     },
        //     {
        //         nombre:'test5', apellido:'test5',
        //         dni:10109008,
        //         rol:idUser,
        //         password:generaHash('123'),
        //         username:'test5',
        //         email:'test5@test.com'
        //     },
        //     {
        //         nombre:'test6', apellido:'test6',
        //         dni:10109009,
        //         rol:idUser,
        //         password:generaHash('123'),
        //         username:'test6',
        //         email:'test6@test.com'
        //     },
        //     {
        //         nombre:'test7', apellido:'test7',
        //         dni:101090010,
        //         rol:idUser,
        //         password:generaHash('123'),
        //         username:'test7',
        //         email:'test7@test.com'
        //     },
        //     {
        //         nombre:'test8', apellido:'test8',
        //         dni:10109011,
        //         rol:idUser,
        //         password:generaHash('123'),
        //         username:'test8',
        //         email:'test8@test.com'
        //     },

        // ]

        // let resultado=await usuarioModelo.insertMany(usuarios)
        // console.log(resultado)

        // let roles=[

        //     {
        //         codigo:100,
        //         nombre:'ADMINISTRADOR',
        //         descrip:'Administrador del sistema'
        //     },
        //     {
        //         codigo:101,
        //         nombre:'USUARIO',
        //         descrip:'Usuario del sistema'
        //     },
        //     {
        //         codigo:102,
        //         nombre:'USUARIO-ASOCIADO',
        //         descrip:'Usuario Asociado del sistema'
        //     },
        // ]


    //     let resultado=await rolModelo.insertMany(roles);
    //     console.log(resultado);

    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }
}

conectar();

