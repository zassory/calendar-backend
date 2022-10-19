const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req , res = response , next ) => {
    
    const token = req.header('x-token');

    if(!token){
     return res.status(401).json({
        ok:false,
        msg:'No token in petition'
     });
    }

    try{

        //Payload
        const { uid , name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        //No vienen en la peticion
        req.uid = uid;
        req.name = name;

        

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