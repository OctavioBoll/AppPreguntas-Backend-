const {Schema, model, models} = require('mongoose')
//import {Schema, model} from 'mongoose'

module.exports = ROLES = {"user":String,"admin":String}
//export const ROLES = {"user":String,"admin":String}

const roleSchema = new Schema({
    name:String,
}, 
{
    versionKey:false
})

module.exports = model("Role", roleSchema)
//export default model("Role", roleSchema)
