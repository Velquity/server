import express from 'express'

import * as usersController from '../controllers/admin/usersController.js'
import ROLES_LIST from '../config/roles_list.js'
import verifyRoles from '../middleware/verifyRoles.js'

const router = express.Router()

router.route('/')
    .get(usersController.getAllUsers)   // TODO: remove unprotected route
    // .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser)

router.route('/:id')
    .get(usersController.getUser)

export default router