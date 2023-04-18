import { funcion as fn} from "./factory.js"
import { getFuncion } from "./factory.js"

const prueba= async(a, b)=>{

    let resultado=(await getFuncion())(3,3)

    console.log(resultado)

}

prueba(3,3)