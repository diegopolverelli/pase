function filtrarPorObjeto(array, filtro) {
    // return array.filter((elemento) =>
    //     Object.entries(filtro).every(([clave, valor]) => elemento[clave] === valor)
    // );

    return array.filter((elemento) => {

        // console.log(Object.entries(filtro))
        let resultado = Object.entries(filtro).every(([clave, valor]) => elemento[clave] === valor)
        return resultado

    }
    );
}

const empleados = [
    { nombre: 'Juan', edad: 30, departamento: 'Ventas' },
    { nombre: 'Monica', edad: 25, departamento: 'Marketing' },
    { nombre: 'Pedro', edad: 35, departamento: 'Ventas' },
    { nombre: 'Ignacio', edad: 30, departamento: 'Ventas' },
    { nombre: 'Emilio', edad: 25, departamento: 'Marketing' },
    { nombre: 'Pedro', edad: 35, departamento: 'Ventas' },
    { nombre: 'Manuel', edad: 30, departamento: 'Ventas' },
    { nombre: 'Victoria', edad: 30, departamento: 'Ventas' },
    { nombre: 'Ezequiel', edad: 30, departamento: 'Ventas' },


];

// const filtro = { departamento: 'Ventas', edad: 30 };

// const empleadosFiltrados = filtrarPorObjeto(empleados, filtro);

// console.log(empleadosFiltrados);
// Output: [{ nombre: 'Juan', edad: 30, departamento: 'Ventas' }, { nombre: 'Pedro', edad: 35, departamento: 'Ventas' }]

const f1 = () => {
    let dep = 'Ventas'
    let edad = 30
    let filtro = { departamento: dep, edad }

    console.log('FILTRA DENTRO DE LA FUNCION:', filtrarPorObjeto(empleados, filtro))
}

f1()