const {ROLES} = require('../models/Role')
const User = require('../models/User')

//import { ROLES } from '../models/Role'
//import User from '../models/User'

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])){
                return res.status(404).json({
                    message:'Roles ${req.body.roles[i]} does not exist'
                })            
            }        
        }   
    }
    next();
}

const checkDuplicateUsernameOrEmail = async (req, res, next) => {

    const user = await User.findOne({username: req.body.name})
    if (user) return res.status(404).json({message:'El usuario ya existe'})
    
    const email = await User.findOne({email: req.body.email})
    if (email) return res.status(404).json({message:'El email ya existe'})
    
    next();
}

module.exports = {checkRolesExisted, checkDuplicateUsernameOrEmail}