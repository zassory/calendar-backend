const { Schema , model } = require('mongoose');

const EventSchema = Schema({

    title: {
        type: String,
        required:true
    },
    notes:{
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,// <--- this is the type
        ref: 'User',
        required:true
    }
});

EventSchema.method('toJSON', function(){
    //Le extraigo ambos y lo sobreescribo dejando solo el objeto
    const { __v, _id, ...object } = this.toObject();
    //Reemplazo y a la vez lo creo
    object.id = _id;
    return object;
});

module.exports = model('Event', EventSchema );