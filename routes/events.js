const express = require('express');
const router = express.Router();
const { filedsValidator } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate'); // REVISAR
const { getEvents, newEvent, updateEvent, deleteEvent } = require('../controllers/events');

/*
Todas tienen que pasar por la validación del JWT. Si alguna no tuviera que hacerlo colocar la siguiente
línea debajo de la ruta que no necesita validateJWT
*/
router.use( validateJWT );

// Obtener eventos
router.get('/', getEvents);
// Crear un nuevo evento
router.post('/',
    [
        check('title', 'El título es obligatorio',).not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria',).custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria',).isDate(),
        filedsValidator
    ],
    newEvent);
// Actualizar evento
router.put('/:id', updateEvent);
// Borrar evento
router.delete('/:id', deleteEvent);


module.exports = router;