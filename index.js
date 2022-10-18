const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//Create express server
const app = express();

// Base de datos
dbConnection();

//Directorio publico
app.use( express.static('public') );

//Lecutra y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth')  );


//Listen petition
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${  process.env.PORT  }`);
});