const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req , res = response , next ) => {
    
    const token = req.header('x-token');//Obtengo el token

    if(!token){
     return res.status(401).json({
        ok:false,
        msg:'No token in petition'
     });
    }//Si no hay peticion no sigue

    try{
        
        const { uid , name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );//Ya tengo el id del verify de mi jwt

        //No vienen en la peticion
        req.uid = uid;
        req.name = name;
        //Los agrego as mi peticion        

    }catch(error){
        return res.status(401).json({
            ok:false,
            msg:'Token no válido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}