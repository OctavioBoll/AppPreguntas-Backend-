const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User')
const Role = require('../models/Role')


//import jwt from 'jsonwebtoken'
//import config from '../config'
//import User from '../models/User'
//import Role from '../models/Role'

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]
        if(!token) return res.status(403).json({message:"no token provided"})

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.idUserFound
        const user = await User.findById(req.userId, {password:0})
        if(!user) return res.status(404).json({message:"Usuario no existe"})
        
        next()
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"})
    }
};

const isModerator = async (req,res,next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: user.roles }})

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
    }
    return res.status(403).json({message: "require moderator role"})
}

const isUser = async (req,res,next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: user.roles }})

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
            next();
            return;
        }
    }
    return res.status(403).json({message: "require user role"})
}

const isAdmin = async (req,res,next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: user.roles }})

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    return res.status(403).json({message: "require admin role"})
}

module.exports = {verifyToken, isModerator, isUser, isAdmin}