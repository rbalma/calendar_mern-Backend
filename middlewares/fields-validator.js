const { validationResult } = require('express-validator');

const filedsValidator = (req, res, next) => {

    const errors = validationResult( req );

    if(!errors.isEmpty()){
        // Hubo un error en la info que me mandó el usuario
       return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();
} 

module.exports = {
    filedsValidator
}