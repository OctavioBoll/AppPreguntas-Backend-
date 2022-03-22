const User = require('../models/User')
const Topics = require('../models/Questions')
const jwt = require('jsonwebtoken')
const config = require('../config')
const { validationResult } = require('express-validator')
require("dotenv").config()

const topicsCtrl = {}

topicsCtrl.getTopics = async (req, res) => {
    try {
        const token = req.headers.authorization
        //config.SECRET --> process.env.SECRET
        const decoded = jwt.verify(token, process.env.SECRET)
        const topics = await Topics.find({ user_id: { $in: ["" + decoded.idUserFound] } })
        res.status(200).json({ topics })
    } catch (error) {
        res.status(400).json({ message: 'error al obtener topics ' + error })
    }
}

topicsCtrl.createTopics = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors:errors.array() })
    }
    try {
        const { topic, questions } = req.body;
        const token = req.headers.authorization
        //config.SECRET --> process.env.SECRET
        const decoded = jwt.verify(token, process.env.SECRET)
        objectQuest = []
        for (let i = 0; i < questions.length; i++) {
            objectQuest.push(questions[i]);
        }

        const newTopics = new Topics({
            user_id: decoded.idUserFound,
            topic: topic,
            questions: {
                title: questions[0].title,
                descripcion: questions[0].descripcion
            }
        })
        await newTopics.save()

        res.status(200).json({ newTopics })
    } catch (error) {
        res.status(404).json({ message: 'error al crear un topic ' + error })
    }
}

topicsCtrl.updateTopic = async (req, res) => {
    try {
        const topicos = await Topics.findByIdAndUpdate(req.body._id, req.body)
        res.status(200).json({topicos})
    } catch (error) {
        res.status(404).json({ message: 'error al actualizar topico ' + error })
    }
}

topicsCtrl.getTopicByUser = async (req, res) => {
    try {
        const topic = await Topics.find()
        const topicUser = []
        for (let i = 0; i < topic.length; i++) {
            if (topic[i].user_id == req.params.id) {
                topicUser.push(topic[i]);
            }
        }
        res.status(200).json({ topicUser })
    } catch (error) {
        res.status(404).json({ message: 'error al obtener topic por usuario ' + error })
    }
}


topicsCtrl.deleteTopic = async (req, res) => {
    try {
        const topic = await Topics.findByIdAndDelete(req.params.id)
        res.status(200).json({ message:' topico eliminado con exito: ' + topic})
    } catch (error) {
        res.status(404).json({ message: 'error al eliminar topic ' + error })

    }
}



//----------------------updateTopi Viejo-------------------
/** 
topicsCtrl.updateTopic = async(req, res) =>
{
    const {topic, questions} = req.body;
    objectQuest = []
    for (let i = 0; i < questions.length; i++) {
            objectQuest.push(questions[i]) ;       
    }
    const token = req.headers.authorization
    const decoded = jwt.verify(token, config.SECRET)
    const topicsFind = await Topics.find({user_id:{$in:[decoded.idUserFound]}})
    const newTopics = new Topics({ 
        _id:topicsFind[0]._id,
        user_id: decoded.idUserFound,
        topic:topic,
        questions:objectQuest
    })
    const topicos = await Topics.findByIdAndUpdate(topicsFind[0]._id,newTopics)
    const { questions} = req.body;
}
*/

//----------------GetTopic sin mostrar la id-----------------
/**
topicsCtrl.getTopics = async (req, res) => {
    const topics = await Topics.find()
    const topicUser = []
    const quest = []

    const token = req.headers.authorization
    const decoded = jwt.verify(token, config.SECRET)
    
    for (let i = 0; i < topics.length; i++) {
        if (topics[i].user_id == decoded.idUserFound) {
            for (let h = 0; h < topics[i].questions.length; h++) {
                quest.push(topics[i].questions[h])
            }
            topicClone = new Topics({
                topic:topics[i].topic,
                questions:quest
            })  
            topicUser.push(topicClone);
        }
    }
    res.status(200).json({topicUser})
}
*/

module.exports = topicsCtrl