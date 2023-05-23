let numeros=[1,2,3,4,5]
let resultado=numeros.map(num=>num*2)
console.log('Resultado map: ',resultado)

const funcionPrueba=(arregloDeNumeros)=>{
    return arregloDeNumeros.map(num=>num*2)
}

resultado=funcionPrueba(numeros);
console.log('Resultado funcionPrueba(); ',resultado);


function f1(nombre){
    console.log('hola '+nombre)
}

function f2(nombre){
    console.log('como va '+nombre+'?')
    return 'como va '+nombre+'?'
}

function f3(nombre){
    console.log('chau '+nombre)
}

f1('Viviana')
f2('Viviana')
f3('Viviana')

let arreglo=[f1, f2, f3]

resultado=arreglo.map(e=>e('Marcelo'))
console.log('Resultado ejecución del map con array de funciones (console.log): ',resultado)


let funcionPrueba2=(arreglo)=>{
    arreglo.map(funcion=>funcion('José'))
}
funcionPrueba2(arreglo)


funcionPrueba2=(arreglo)=>{
    return arreglo.map(funcion=>(...params)=>{
        console.log(params)
        funcion.apply(this, params)
    })
}

console.log(funcionPrueba2(arreglo));

funcionPrueba2(arreglo).forEach(element => {
    element('Diego','Polverelli','Docente');
}); 