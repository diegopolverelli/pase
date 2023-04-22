
export class DaoMemory{
    constructor(){
        this.colecciones={
            usuarios:[],
            juguetes:[]
        }
    }

    get(coleccion){
        return this.colecciones[coleccion]
    }

    getBy(coleccion,filtro){
        return filtrarPorObjeto(this.colecciones[coleccion], filtro)
    }

    save(coleccion, aGrabar){
        if(this.colecciones[coleccion].length==0){
            aGrabar.id=1
        }else{
            let lastId=this.colecciones[coleccion][this.colecciones[coleccion].length-1].id
            aGrabar.id=lastId+1
        }

        this.colecciones[coleccion].push(aGrabar)
        return aGrabar
    }    

}