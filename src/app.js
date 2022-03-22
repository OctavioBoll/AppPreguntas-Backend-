//imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const topicRutes = require('./routes/topicRutes')

const createRoles = require('./libs/initialSetup');
require("dotenv").config()

//import authRoutes from './routes/auth.routes'
//import {createRoles} from './libs/initialSetup'


//comienzo de la app
const app = express()
createRoles();

const PORT = process.env.PORT || 3000
//indicar el puerto

app.set('port', PORT);
//console.log("En el puerto " + process.env.PORT)

//configuraciones para cors morgan json 
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//rutas que usa la aplicacion

app.use('/api/auth', authRoutes)

// localhost:3000/api/topics
app.use('/api', topicRutes)

//exportar app
module.exports = app;