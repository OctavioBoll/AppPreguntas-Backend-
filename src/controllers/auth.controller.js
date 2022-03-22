//import User from '../models/User'
const User = require('../models/User') 
const jwt = require('jsonwebtoken')
const config = require('../config')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
require("dotenv").config()

//const { config } = require('dotenv');
//import jwt from 'jsonwebtoken'
//import config from '../config'
//import Role from '../models/Role';

const signup = async (req, res) => {
    const {name, email, pass, roles} = req.body;

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors:errors.array() })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordCrypt = await bcrypt.hash(pass, salt)

    const newUser = new User({
        username: name,
        email: email,
        password: passwordCrypt
    })

    if(roles){
        const foundRoles = await Role.find({name:{$in:roles}})
        newUser.roles = foundRoles.map(role => role._id)
    }else {
        const role = await Role.findOne({name:"user"})
        newUser.roles = [role._id]
    }

    try {
        const savedUser = await newUser.save();
        const idUserFound = savedUser._id
        //idUSerFound siempre se usa el mismo nombre para encontrar el JWT se coloca ese nombre dentro del JWT
        const token = jwt.sign({idUserFound}, process.env.SECRET, {expiresIn:86400})
        res.status(200).json({token})
    } catch (error) {
        res.status(404).json({message:'error al registrar usuario ' + error})   
    }
}

const signin = async(req, res) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors:errors.array() })
    }
    
    try {
        userFound = await User.findOne({ email: req.body.email}).populate("roles")
        if(!userFound) return res.status(400).json({message:"email incorrecta"})

        matchPassword = await bcrypt.compare(req.body.pass , userFound.password)
        if(!matchPassword) return res.status(401).json({message:"password incorrecta"})
        
        const idUserFound = userFound._id
        token = jwt.sign({idUserFound}, process.env.SECRET , {expiresIn:86400})

        res.status(200).json({token})
        
    } catch (error) {
        res.status(404).json({message:'error al iniciar sesion ' + error}) 
    }
    
}

module.exports = {signup, signin};