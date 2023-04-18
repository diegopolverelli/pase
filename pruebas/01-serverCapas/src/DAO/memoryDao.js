function filtrarPorObjeto(array, filtro) {
    return array.filter((elemento) =>
        Object.entries(filtro).every(([clave, valor]) => elemento[clave] === valor)
    );

    // return array.filter((elemento) =>{
        
    //     console.log(Object.entries(filtro))
    //     let resultado=Object.entries(filtro).every(([clave, valor]) => elemento[clave] === valor)
    //     return resultado
    // }
    // );
}


export class MemoryDAO{
    constructor(){
        this.colecciones={
            juguetes:[],
            usuarios:[]
        }
    }

    get(coleccion, filtro){
        if(!this.colecciones[coleccion]) throw new Error(`No existe la coleccion ${coleccion}`)

        if(filtro){
            return filtrarPorObjeto(this.colecciones[coleccion],filtro)
        }else{
            return this.colecciones[coleccion]  
        }

    }

    post(coleccion, aGrabar){
        if(!this.colecciones[coleccion]) throw new Error(`No existe la coleccion ${coleccion}`)

        if(this.colecciones[coleccion].length==0){
            aGrabar.id=1;
        }else{
            let lastIndex=this.colecciones[coleccion].length-1
            let id=this.colecciones[coleccion][lastIndex].id;
            aGrabar.id=id+1
        }

        this.colecciones[coleccion].push(aGrabar)
        return aGrabar
    }

}