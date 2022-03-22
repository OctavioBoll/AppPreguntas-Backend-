const router = require('express').Router()

//const {Routes, Router} = require('express')
//const router = Router()
const authCtrl = require('../controllers/auth.controller')
const verifySignup = require('../middlewares/verifySignup')
const {body, validationResult} = require('express-validator')

//import {Routes} from 'express'

//import * as authCtrl from '../controllers/auth.controller'
//import { verifySignup } from '../middlewares'


router.post('/registrar',[
    verifySignup.checkDuplicateUsernameOrEmail, 
    verifySignup.checkRolesExisted,
    body('email','ingrese un email valido').exists().notEmpty().isLength({min:1}),
    body('pass','ingrese un password valido').exists().notEmpty().isLength({min:1})
],authCtrl.signup)

router.post('/login', [
    body('email','ingrese un email valido').exists().notEmpty().isLength({min:1}),
    body('pass','ingrese un password valido').exists().notEmpty().isLength({min:1})
] ,authCtrl.signin)



 module.exports = router