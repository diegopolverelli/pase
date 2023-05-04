export const generaErrorCliente=(cliente)=>{
    return `Es necesario completar los siguientes datos:
    - nombre, de tipo String. Se recibió ${cliente.nombre}
    - apellido, de tipo String. Se recibió ${cliente.apellido}
    - email: de tipo String. Se recibió ${cliente.email}`
}