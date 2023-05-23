const prueba={
  nombre:'Juan', 
  apellido:'Martinez',
  saludo:function(ciudad, provincia){
    console.log(this.nombre+' '+this.apellido+', de '+ciudad+', provincia de '+provincia );
  },
}

prueba.saludo('Necochea','Buenos Aires')

let prueba2={
  nombre:'Malena', apellido:'Villalba'
}

prueba.saludo.apply(prueba2, ['Gral. Pico', 'La Pampa'])


class Persona{
  constructor(nombre, apellido){
    this.nombre=nombre;
    this.apellido=apellido;
  }
  
  metodoPrueba=()=>{
    prueba.saludo.apply(this,['Pocitos','Mendoza']);
  }

}

let persona=new Persona('Roxana','Beltran');
persona.metodoPrueba();



