export class UsuariosDto{
    constructor(usuario){
        this.nombre=usuario.first_name;
        this.apellido=usuario.last_name
    }
}