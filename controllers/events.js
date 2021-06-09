const Event = require('../models/Event');

const getEvents = async(req, res) => {

    /* populate(). Indico el atributo del event para buscar el usuario y luego de la coma 
       especifico los atributos que quiero. El id viene implicito
    */
    const events = await Event.find().populate('user', 'name email');

    res.json({
        ok: true,
        events
    });
}

const newEvent = async (req, res) => {

    const event = new Event( req.body );

    try {
        event.user = req.uid;
        const eventDB = await event.save();

       res.json({
           ok: true,
           evento: eventDB
       });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const updateEvent = async(req, res) => {

    const eventId = req.params.id;

    try {
        const event = await Event.findById( eventId );
        if(!event){
           return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        // Verifica que solo el usuario que creó el evento pueda actualizarlo
        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            });
        }

        // En el body de la petición no viene el id del user
        const newEvent = {
            ...req.body,
            user: req.uid
        }

        // new : true es para que me devuelve el evento con los datos actualizados
        const updateEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true });

        res.json({
            ok: true,
            event: updateEvent
        })
        
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const deleteEvent = async(req, res) => {
    const eventId = req.params.id;

    try {
        const event = await Event.findById( eventId );
        if(!event){
           return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        // Verifica que solo el usuario que creó el evento pueda actualizarlo
        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento'
            });
        }


        await Event.findByIdAndDelete( eventId );

        res.json({ ok: true });
        
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


module.exports= {
    getEvents,
    newEvent,
    updateEvent,
    deleteEvent
}