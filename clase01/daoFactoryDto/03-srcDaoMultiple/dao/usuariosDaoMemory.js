import { filtrarPorObjeto } from "../utils/utils.js"

export class UsuariosDaoMemory{
    constructor(){
        this.usuarios=[]
    }

    get(){
        return this.usuarios
    }

    getBy(filtro){
        return filtrarPorObjeto(this.usuarios, filtro)
    }

    save(usuario){
        if(this.usuarios.length==0){
            usuario.id=1
        }else{
            let lastId=this.usuarios[this.usuarios.length-1].id
            usuario.id=lastId+1
        }

        this.usuarios.push(usuario)
        return usuario
    }
}