function filtrarPorObjeto(array, filtro) {
    // return array.filter((elemento) =>
    //     Object.entries(filtro).every(([clave, valor]) => elemento[clave] === valor)
    // );

    return array.filter((elemento) =>{
        
        // console.log(Object.entries(filtro))
        let resultado=Object.entries(filtro).every(([clave, valor]) => elemento[clave] === valor)
        return resultado
    }
    );
}

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