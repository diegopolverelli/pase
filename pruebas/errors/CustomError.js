export class CustomError{
    static createError(nombre, causa, mensaje, codigo){
        const error=new Error(mensaje)
        error.codigo=codigo
        error.causa=causa
        error.nombre=nombre
        throw error
    }
}

