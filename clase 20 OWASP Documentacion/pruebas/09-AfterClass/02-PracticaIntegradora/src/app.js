import express from 'express';
import __dirname from './utils.js';

import usersRouter from './routes/users.router.js';
import coursesRouter from './routes/courses.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js'

import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;
const connection = mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase19')
// const connection = mongoose.connect(process.env.MONGO_URL)


/**
 * Template engine
 */
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

/**
 * Middlewares
 */
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

initializePassport();
app.use(passport.initialize());
app.use(cookieParser());

app.use('/',viewsRouter)
app.use('/api/users',usersRouter);
app.use('/api/courses',coursesRouter);
app.use('/api/sessions',sessionsRouter);

const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));
