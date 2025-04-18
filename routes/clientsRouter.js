import express from 'express'

import * as clientController from '../controllers/admin/clientsController.js'
import ROLES_LIST from '../config/roles_list.js'
import verifyRoles from '../middleware/verifyRoles.js'

const router = express.Router()

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), clientController.getAllClients)
    .post(clientController.createNewClient)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Client), clientController.updateClient)
    .delete(verifyRoles(ROLES_LIST.Admin), clientController.deleteClient)

router.route('/:id')
    .get(clientController.getClient)

export default router