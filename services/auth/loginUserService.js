const { request , response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const { generarJWT } = require('../../helpers/jwt');

const loginUserService = async( email = '' , password = '' ) => {
      
    const user = await User.findOne({ email  });
    try{
        if(!user ){
            return res.status(404).json({
                ok: false,
                msg:'Usuario no existe'
            })
        }

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user.password  );
        if(!validPassword){
            return res.status(401).json({
                ok:false,
                msg:'Wrong credentials, please try again'
            });
        }

        //Generar mi JWT
        const token = await generarJWT(user.id,user.name);

        return {
            statusCode:200,
            ok:true,
            uid:user.id,
            name:user.name,
            token
        }
    }  catch( error  ){
        console.log(error);
        return {
            statusCode:200,
            ok:false,
            msg:'Por favor hable con el administrador'
        }
        // res.status(500).json({
        //     ok:false,
        //     msg:'Por favor hable con el administrador'
        // })
    }

}

module.exports = loginUserService;
