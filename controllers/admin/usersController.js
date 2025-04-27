import { User } from '../../model/index.js'

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        if (!users)
            return res.status(204).json({'message': 'No users found'})
        res.json(users)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id)
        return res.status(400).json({ "message": 'User ID required' })

    try {
        const user = await User.findOne({_id: req.body.id}).exec()
        if (!user) {
            return res.status(204).json({'message': `User ID ${req.body.id} not found`})
        }
        const result = await user.deleteOne({_id: req.body.id})
        res.json(result)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getUser = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({ "message": 'User ID required' })

    try {
        const user = await User.findByPk(req.params.id)
        if (!user) {
            return res.status(204).json({'message': `User ID ${req.params.id} not found`})
        }
        res.json(user)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export { getAllUsers, deleteUser, getUser }