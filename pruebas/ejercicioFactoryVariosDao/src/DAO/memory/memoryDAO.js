console.log("Pasó por el memory DAO")

class MemoryDAO{
    constructor(){
        this.usuarios=[]
    }

    get(){
        return this.usuarios;
    }
}

export default MemoryDAO;