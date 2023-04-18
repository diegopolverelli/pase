export let funcion

let tipo=1
export const getFuncion=async()=>{
    if(tipo==1){
        const {f2} = await import('./modulo.js')
        funcion=f2;
        return f2
    }else{
        const f2 = (a,b)=> a/b
        funcion=f2;
        return f2
    }
}

// console.log(funcion(4,4))