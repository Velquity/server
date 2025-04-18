import express from 'express'

import * as chequeController from '../controllers/banking/chequeController.js'
import ROLES_LIST from '../config/roles_list.js'
import verifyRoles from '../middleware/verifyRoles.js'

const router = express.Router()

router.route('/')
    .get(chequeController.getAllCheques)
    .post(chequeController.createNewCheque)
    .put(chequeController.updateCheque)
    .delete(chequeController.deleteCheque)

router.route('/:id')
    .get(chequeController.getCheque)

export default router