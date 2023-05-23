import fs from 'fs';
import __dirname from '../../utils.js';
const path = __dirname+'/files/users.json'
export default class Users{
    constructor(){
        console.log(`Working with users on path: ${path}`)
    }
    getAll = async() =>{
        if(fs.existsSync(path)){
            try{
                let data = await fs.promises.readFile(path,'utf8');
                return JSON.parse(data);
            }
            catch(error){
                console.log("Couldn't read file: "+error)
                return null;
            }
        }
        else{
            return [];
        }
    }

    getBy = async(filtro) =>{
        if(fs.existsSync(path)){
            console.log('existe users.json')
            try{
                let data = await fs.promises.readFile(path,'utf8');
                let usuarios=JSON.parse(data)
                let usuario;
                console.log(filtro)
                if(filtro.email){
                    console.log('entro acá')
                    usuario=usuarios.find(u=>u.email==filtro.email)
                }else{
                    console.log('ingresa aca a filtrar por id ',filtro)
                    usuario=usuarios.find(u=>u.id==filtro._id)
                }
                return usuario;
            }
            catch(error){
                console.log("Couldn't read file: "+error)
                return null;
            }
        }
        else{
            console.log('aca...')
            return null;
        }
    }

    updateUser=async(id,user)=>{
        // falta implementacion
        return user
    }

    saveUser = async(user) =>{
        try{
            user.courses = [];
            let users = await this.getAll();
            if(users.length===0){//First user
                user.id=1;
                users.push(user)
                await fs.promises.writeFile(path,JSON.stringify(users,null,'\t'))
                return user;
            }
            else{
                user.id = users[users.length-1].id+1;
                users.push(user);
                await fs.promises.writeFile(path,JSON.stringify(users,null,'\t'));
                return user;
            }
        }
        catch(error){
            console.log("Couldn't write file: "+error)
            return null;
        }
    }
}