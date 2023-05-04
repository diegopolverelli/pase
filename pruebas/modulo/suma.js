import colors from 'colors'

export const suma=(...numeros)=>{
    let resultado=numeros.reduce((acum, actu)=>acum+actu,0)
    return resultado.toString().green.bold
}