import express from 'express'

import * as chequeController from '../controllers/banking/chequeController.js'
import * as productController from '../controllers/inventory/productController.js'


const router = express.Router()

// Cheque Routes
router.route('/cheque')
    .get(chequeController.getAllCheques)
    .post(chequeController.createNewCheque)
    .put(chequeController.updateCheque)
    .delete(chequeController.deleteCheque)
router.route('/cheque/:id')
    .get(chequeController.getCheque)

// Product Routes
router.route('/product')
    .get(productController.getAllProducts)
    .post(productController.createNewProduct)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct)
router.route('/product/:id')
    .get(productController.getProduct)


export default router