import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase21')

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.get('/set-cookie', (req, res) => {
    // Crear el valor de la cookie
    const cookieValue = 'miCookieDePruebaDiego=ejemplo; Path=/; Expires=' + new Date(Date.now() + 900000).toUTCString();
  
    // Establecer el encabezado Set-Cookie usando res.set()
    res.set('Set-Cookie', cookieValue);
  
    // Enviar una respuesta al cliente
    res.cookie('cookieConParser','Prueba 2...!!!').send('Cookie establecida');
  });


app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
