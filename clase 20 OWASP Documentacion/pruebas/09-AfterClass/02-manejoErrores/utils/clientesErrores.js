
export const errorAltaCliente=(cliente)=>{
    return `
    Argumentos invalidos para el cliente. Se esperaba:
    - nombre, de tipo String: se recibió ${cliente.nombre},
    - apellido, de tipo String: se recibió ${cliente.apellido},
    - email, de tipo String: se recibió ${cliente.email}`
}

export const errorObtenerClienteById=(id)=>{
    return `Se esperaba un id numérico y se recibió: ${id}`
}

export const errorClienteInexistente=(id)=>{
    return `No existen cliente con id ${id}`
}
