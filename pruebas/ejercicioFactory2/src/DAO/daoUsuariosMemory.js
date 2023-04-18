
function filtrarPorObjeto(array, filtro) {
    // return array.filter((elemento) =>
    //     Object.entries(filtro).every(([clave, valor]) => elemento[clave] === valor)
    // );

    return array.filter((elemento) => {

        // console.log(Object.entries(filtro))
        let resultado = Object.entries(filtro).every(([clave, valor]) => elemento[clave] === valor)
        return resultado

    }
    );
}


export class DaoUsuariosMemory{
    constructor(){
        this.usuarios=[]
    }

    get(filtro){
        if(filtro){
            return filtrarPorObjeto(this.usuarios, filtro)
        }else{
            return this.usuarios
        }
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