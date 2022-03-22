const { Schema, model } = require('mongoose')


const questionsSchema = new Schema({
    user_id: {
        ref:"User",
        type: Schema.Types.ObjectId
    },
    topic: {
        type: String
    },
    questions: [{
        title: String,
        descripcion:String
    }],
    users_shared: [{
        ref:"User",
        type:Schema.Types.ObjectId
    }]

}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Questions', questionsSchema);