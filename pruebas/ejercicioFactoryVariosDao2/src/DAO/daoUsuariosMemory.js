
export class DaoUsuariosMemory{
    constructor(){
        this.usuarios=[]
    }

    get(filtro){
        return this.usuarios
    }

    save(usuario){
        if(this.usuarios.length==0){
            usuario.id=1
        }else{
            let id=this.usuarios[this.usuarios.length-1].id
            usuario.id=id+1
        }

        this.usuarios.push(usuario)
        return usuario
    }
}