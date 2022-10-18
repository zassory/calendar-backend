const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req , res = response , next ) => {

     //Manejo de errores
     const errors = validationResult(  req  );
     if( !errors.isEmpty() ){
         return res.status(400).json({
             ok:false,
             errors: errors.mapped()
         });
     }
     //Aqui esta el error , si no solo sigue y muestra la response
 
    next();

}


module.exports = {
    validarCampos
}