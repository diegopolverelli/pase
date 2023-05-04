export default class CustomError {
    static createError(
        {name="Error",
        cause, 
        message, 
        code=1}
    ){
        // const error=new Error(message,{cause})
        const error=new Error(message)

        error.name=name
        error.code=code
        error.cause=cause
        error.algo='Prueba de propiedad agregada'
        throw error
    }   
}