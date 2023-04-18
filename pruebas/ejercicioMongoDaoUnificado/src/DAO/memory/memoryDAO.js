console.log("MemoryDAO Online")

class MemoryDAO{
    constructor(){
        this.usuarios=[]
    }

    get(){
        return this.usuarios;
    }
}

export default MemoryDAO;