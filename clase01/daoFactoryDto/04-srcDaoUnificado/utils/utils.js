import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


function filtrarPorObjeto(array, filtro) {
    // return array.filter((elemento) =>
    //     Object.entries(filtro).every(([clave, valor]) => elemento[clave] === valor)
    // );

    return array.filter((elemento) =>{
        
        // console.log(Object.entries(filtro))
        let resultado=Object.entries(filtro).every(([clave, valor]) => elemento[clave] === valor)
        return resultado
    }
    );
}

export {filtrarPorObjeto}