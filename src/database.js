const mongoose = require('mongoose')
require("dotenv").config()

const DB_URI = process.env.DB_URI;

mongoose
.connect(DB_URI)
.then( (db) => console.log("db is connected"))
.catch((err)=> console.log("error" + err));

module.exports = mongoose