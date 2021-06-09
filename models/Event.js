const { Schema, model } = require('mongoose');

const eventSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

// Esto elimina el atributo _v y cambia el _id por id a la hora de ver el objeto JSON luego de una petición
eventSchema.method('toJSON', function(){
   const { __v, _id, ...object } = this.toObject();
   object.id = _id;
   return object;
});


module.exports = model('Event', eventSchema);