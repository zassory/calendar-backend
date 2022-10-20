const { response } = require('express');
const Event  = require('../models/Event');
//const { generarJWT } = require('../helpers/jwt');

const getEvents = (req,res = response) => {

    return res.status(200).json({
        ok:true,
        msg:'getEvents'
    });
}

const createEvent = async(req,res = response) => {
    
    const event = new Event( req.body );

    console.log(req);
        
    try{

        //const eventDB = await event.save();
        
        res.status(201).json({
            ok:true,
            event:'ok'
        });

    }catch( error ){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Talk with administrator'
        });
    }    
}

const editEvent = (req,res=response) => {

    res.status(200).json({
        ok:true,
        msg:'editEvent'
    });
}

const deleteEvent = (req,res=response) => {

    res.status(200).json({
        ok:true,
        msg:'deleteEvent'
    });
}

module.exports = {
    getEvents,
    createEvent,
    editEvent,
    deleteEvent
}