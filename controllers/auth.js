const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');
//Service
const loginUserService = require('../services/auth/loginUserService');

const createUser = async(req,res = response) => {
        
    const { email , password } = req.body;

    try{

        let user = await User.findOne({ email });

        if( user ){
            return res.status(400).json({
                ok:false,
                msg:'Email already exists'
            });
        }
        
        user = new User( req.body );

        //Encriptar password
        const salt = bcrypt.genSaltSync();//10 por defecto
        user.password = bcrypt.hashSync( password, salt );


        await user.save();
        // Generar JWT
        const token = await generarJWT( user.id, user.name );

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
               
}

const loginUser = async(req,res = response) => {

    const { email , password } = req.body;

    const { 
        statusCode , 
        ok , 
        uid , 
        name , 
        token }  =  await loginUserService(  email , password  );
    
    if( statusCode === 401 ){
        return res.status( statusCode ).json({
            ok,
            msg
        });
    }

    res.json({
        ok,
        uid,
        name,
        token
    })                           
}

const renewToken = async(req,res = response) => {
    
    const { uid , name } = req;
    
    // Generar JWT
    const token = await generarJWT( uid, name );

    console.log("----------------------");
    console.log("Token en el renewToken      ", token);

    res.json({
        ok: true,        
        newToken:token,
    });
}



module.exports = {
    createUser,
    loginUser,
    renewToken,
}