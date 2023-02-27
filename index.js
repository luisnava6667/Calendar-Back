const express = require('express')
const dbConnection = require('./database/config')
const cors = require('cors')
require('dotenv').config()

//crear el servidor de express
const app = express()
//lectura y parseo del body
app.use(express.json())
//database
dbConnection()
//cors
app.use(cors())
//rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//Directorio Publico
app.use(express.static('public'))

//escuchar peticiones
app.listen(process.env.PORT || 4000, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})
