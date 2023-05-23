export class CustomError{
    static CustomError(nombre, descrip, mensaje, codigo){
        const error = new Error(mensaje)
        error.nombre=nombre
        error.descrip=descrip
        error.codigo=codigo

        throw error
    }
}

