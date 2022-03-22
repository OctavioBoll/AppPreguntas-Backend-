const {Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
//import {Schema, model } from 'mongoose'
//import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    roles:[{
        ref:"Role",
        type:Schema.Types.ObjectId
    }]
},{
    timestamps:true,
    versionKey:false
})

//metodos staticos

//userSchema.static.encryptPassword = async (password) => {
//    const salt = await bcrypt.getSalt(10)
//    return await bcrypt.hash(password,salt)
//}

//userSchema.static.comparePassword = async(password, recivePassword) =>{
//    return await bcrypt.compare(password, recivePassword)
//}

//exportar el esquema User
module.exports = model('User', userSchema);

//export default model('User', userSchema);