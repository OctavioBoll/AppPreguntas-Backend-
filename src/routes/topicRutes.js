const router = require('express').Router()
const topicCtrl = require('../controllers/topic.controller')
const authToken = require('../middlewares/auth.jwt')
//const validateCreate = require('../validators/topic')
const {body, validationResult} = require('express-validator')

router.get('/getTopicos',
        [authToken.verifyToken],
        topicCtrl.getTopics)

router.get('/topics/:id',
        [authToken.verifyToken],
        topicCtrl.getTopicByUser)

router.post('/topics', 
        [body('topic','Rellene el Formulario topic').exists().notEmpty().isLength({min:1})],
        topicCtrl.createTopics)

router.put('/topics',topicCtrl.updateTopic)

router.delete('/topics/:id',topicCtrl.deleteTopic)

module.exports = router