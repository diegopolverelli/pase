import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from 'express'
import usersRouter from './routes/users.js'
import errorHandler from './middlewares/errors/index.js'
import {engine} from 'express-handlebars'

const app = express()

app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));


app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use('/api/users', usersRouter)

app.use('/registro',(req,res)=>{
    res.render("index")
})

app.use(errorHandler)

const server = app.listen(3000, () => console.log("Server listening port 3000...!!!"))