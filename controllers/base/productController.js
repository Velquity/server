import * as productService from '../../services/base/productService.js'

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts()
        if (!products.length)
            return res.status(204).json({message: 'No Products found.'})
        res.status(200).json(products)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getOneProduct = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'Product ID required.'})

    try {
        const product = await productService.getProductByPk(req.params.id)
        if (!product)
            return res.status(204).json({message: `No Product matches ID ${req.params.id}.`})

        res.status(201).json(product)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createNewProduct = async (req, res) => {
    const {name, manufacturer, distributor, category, subCategory, isAvailable} = req.body
    if (!name || !manufacturer || !distributor || !category || !subCategory)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        const duplicate = await productService.findDuplicate(name, category, subCategory)
        if (duplicate) return res.status(409).json({ message: 'Conflict' })

        const result = await productService.createNewProduct(name, manufacturer, distributor, category, subCategory, isAvailable)
        res.status(201).json(result)
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updateProduct = async (req, res) => {
    const {id, name, manufacturer, distributor, category, subcategory, isAvailable} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const product = await productService.getProductByPk(id)
        if (!product)
            return res.status(204).json({ message: `No Product matches ID ${id}.` })

        const result = await productService.updateProduct(product, name, manufacturer, distributor, category, subcategory, isAvailable)
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteProduct = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'ID parameter is required.'})

    try {
        const product = await productService.getProductByPk(req.params.id)
        if (!product)
            return res.status(204).json({message: `No Product matches ID ${req.params.id}.`})

        const result = productService.changeProductStatus(product, false)
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllProducts,
    getOneProduct,
    createNewProduct,
    updateProduct,
    deleteProduct,
}