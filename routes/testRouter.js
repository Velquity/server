import express from 'express'

import * as chequeController from '../controllers/base/chequeController.js'
import * as productController from '../controllers/base/productController.js'
import * as companyController from '../controllers/base/companyController.js'


const router = express.Router()

// Cheque Routes
router.route('/cheque')
    .get(chequeController.getAllCheques)
    .post(chequeController.createNewCheque)
    .put(chequeController.updateCheque)
router.route('/cheque/:id')
    .get(chequeController.getOneCheque)
    .delete(chequeController.deleteCheque)

// Product Routes
router.route('/product')
    .get(productController.getAllProducts)
    .post(productController.createNewProduct)
    .put(productController.updateProduct)
router.route('/product/:id')
    .get(productController.getOneProduct)
    .delete(productController.deleteProduct)

// Company Routes
router.route('/company')
    .get(companyController.getAllCompanies)
    .post(companyController.createNewCompany)
    .put(companyController.updateCompany)
router.route('/company/:id')
    .get(companyController.getOneCompany)
    .delete(companyController.deleteCompany)


export default router