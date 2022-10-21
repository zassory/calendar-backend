const { response } = require('express');
const Event  = require('../models/Event');
//const { generarJWT } = require('../helpers/jwt');

const getEvents = async(req,res = response) => {

    try{

        const events = await Event.find()
                                  .populate('user','name');
                
        res.status(200).json({
            ok: true,
            events
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Talk with administrator'
        });
    }
        
}

const createEvent = async(req,res = response) => {
    
    const event = new Event( req.body );
            
    try{

        event.user = req.uid;

        const eventDB = await event.save();
        
        res.status(201).json({
            ok:true,
            event:eventDB
        });

    }catch( error ){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Talk with administrator'
        });
    }    
}

const editEvent = async(req,res=response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    console.log(req.params.id);

    try{

        const event = await Event.findById( eventId );        

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'Event dont exists with this id'
            });
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegios de eliminar este evento',
            });
        }

        //Si llega a este punto es la misma persona

        const newEvent = {
            ...req.body,
            user:uid
        }//Porque en la peticion no viene el id de mi usuario y aun no estas añadida
        
        const eventUpdated = await Event.findByIdAndUpdate(eventId,newEvent, { new:true });
        res.status(200).json({
            ok:true,
            event:eventUpdated,
        })
        
        


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Talk with administrator'
        });
    }
        
}

const deleteEvent = async(req,res=response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try{

        const event = await Event.findById( eventId );

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'Event dont exists with this id'
            });
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegios de editar este evento',
            });
        }

        //Si llega a este punto es la misma persona
        

        const eventDeleted = await Event.findByIdAndDelete(eventId);
        res.status(200).json({
            ok:true,
            event:eventDeleted,
            msg:'Event deleted succesfull'
        });
        

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Talk with administrator'
        });
    }
    
}

module.exports = {
    getEvents,
    createEvent,
    editEvent,
    deleteEvent
}