import express from 'express';

import http from 'http'; // <- cargamos el módulo http
import fetch from 'node-fetch'
import axios from 'axios'

const PORT=3200;

const app=express();

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

app.use(express.static('./src/public'))


const peticionConAxios=(res)=>{
  
  //construimos nuestra peticion
  const myInit = {
    method: 'GET',
    headers: { 
      // 'Authorization': token 
    },
    mode: 'cors',
    cache: 'default'
  };

  // let destination = 'http://www.simiapi.com/ApiSimiweb/response/v21/inmueblesDestacados/total/:cantidad';
  let destination = 'http://localhost:3000/login';

  //obtenemos los resultados
  axios.get(destination, myInit)
    .then((result) => {
      console.clear()
      console.log(result.data)
      res.send(result.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

app.get('/prueba',(req,res)=>{

    peticionConAxios(res)  

    // res.send('ok')
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error',(error)=>console.log(error));