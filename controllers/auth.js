const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async(req,res = response) => {
    
    //Solo puede haber una unica respuesta solo una vez    
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

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
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

    const user = await User.findOne({ email });

    try{

        if( !user ){
            return res.status(404).json({
                ok:false,
                msg:'User dont exists'
            })
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user.password );
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Wrong credentials, please try again'
            });
        }

        // Generar mi JWT

        res.json({
            ok: true,
            uid: user.id,
            name: user.name
        });


    } catch(  error  ){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    }
    
    // res.status(202).json({
    //     ok: true,
    //     msg:'login',
    //     email,
    //     password
    // });
}

const renewToken = (req,res = response) => {

    res.json({
        ok: true,
        msg:'renew'
    });
}



module.exports = {
    createUser,
    loginUser,
    renewToken,
}