const { check } = require('express-validator')
const validateResult = require('../helpers/validateHelper')

const validateCreate = [
    check('topic')
    .exists().isEmpty(),
    check('questions.title')
    .exists().isEmpty(),
    check('questions.descripcion')
    .exists().isEmpty(),
    (req,res,next) =>{
        validateResult(req,res,next)
    }
]

module.exports =  validateCreate 