const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Create express server
const app = express();

// Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use( express.static('public') );

//Lecutra y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//Listen petition
app.listen(process.env.PORT, () =>{
    console.clear();
    console.log(`Servidor corriendo en puerto ${  process.env.PORT  }`);
});