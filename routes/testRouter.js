import express from 'express'

import * as chequeController from '../controllers/banking/chequeController.js'
import * as productController from '../controllers/inventory/productController.js'
import * as companyController from '../controllers/purchase/companyController.js'


const router = express.Router()

// Cheque Routes
router.route('/cheque')
    .get(chequeController.getAllCheques)
    .post(chequeController.createNewCheque)
    .put(chequeController.updateCheque)
router.route('/cheque/:id')
    .get(chequeController.getCheque)
    .delete(chequeController.deleteCheque)

// Product Routes
router.route('/product')
    .get(productController.getAllProducts)
    .post(productController.createNewProduct)
    .put(productController.updateProduct)
router.route('/product/:id')
    .get(productController.getProduct)
    .delete(productController.deleteProduct)

// Company Routes
router.route('/company')
    .get(companyController.getAllCompanies)
    .post(companyController.createNewCompany)
    .put(companyController.updateCompany)
router.route('/company/:id')
    .get(companyController.getCompany)
    .delete(companyController.deleteCompany)


export default router