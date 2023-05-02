 import express from 'express'

 const app= express()

 app.listen(3000,()=>console.log("Server online en puerto 3000...!!! - created by Diego"))

 app.get('/',(req, res)=>{
    res.send('OK...!!! Server on line...!!!')
 })