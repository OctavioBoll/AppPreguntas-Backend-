const User = require('../models/User');
const users = {}

users.getUser = async (req, res) => {
    try {
        const usuario = await User.find()
        res.send(usuario)
    } catch (error) {
        res.status(404).json({ message: 'error al obtener usuario ' + error })
    }
}

users.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
    } catch (error) {
        res.status(404).json({ message: 'error al crear un usuario ' + error })
    }
}


module.exports = users;