
export class DaoJuguetesMemory{
    constructor(){
        this.juguetes=[]
    }

    get(filtro){
        return this.juguetes
    }

    save(juguete){
        if(this.juguetes.length==0){
            juguete.id=1
        }else{
            let id=this.juguetes[this.juguetes.length-1].id
            juguete.id=id+1
        }

        this.juguetes.push(juguete)
        return juguete
    }
}