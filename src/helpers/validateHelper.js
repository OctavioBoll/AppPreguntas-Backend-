const  {validationResult}  = require('express-validator')

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(403)
        console.log("error de validacion")
        res.send({errors: error.array() })
    }
}

module.exports = validateResult 