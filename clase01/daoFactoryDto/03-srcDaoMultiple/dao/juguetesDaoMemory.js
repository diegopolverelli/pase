import { filtrarPorObjeto } from "../utils/utils.js"

export class JuguetesDaoMemory{
    constructor(){
        this.juguetes=[]
    }

    get(){
        return this.juguetes
    }

    getBy(filtro){
        return filtrarPorObjeto(this.juguetes, filtro)
    }

    save(juguete){
        if(this.juguetes.length==0){
            juguete.id=1
        }else{
            let lastId=this.juguetes[this.juguetes.length-1].id
            juguete.id=lastId+1
        }

        this.juguetes.push(juguete)
        return juguete
    }
}