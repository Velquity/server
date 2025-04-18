import express from 'express'
import path from 'path'

import authController from "../controllers/public/authController.js"
import logoutController from "../controllers/public/logoutController.js"
import refreshTokenController from "../controllers/public/refreshTokenController.js"
import registerController from "../controllers/public/registerController.js"

const router = express.Router()

router.post('/', authController)
router.get('/logout', logoutController)
router.get('/refresh', refreshTokenController)
router.post('/register', registerController)

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

export default router