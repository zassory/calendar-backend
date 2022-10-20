const { response } = require('express');
//const { Event } = require('../models/Event');
//const { generarJWT } = require('../helpers/jwt');

const getEvents = (req,res = response) => {

    return res.status(200).json({
        ok:true,
        msg:'getEvents'
    });
}

const createEvent = (req,res = response) => {

    //Verificar que tenga el evento
    console.log(req.body);    

    res.status(200).json({
        ok:true,
        msg:'createEvent'
    });
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