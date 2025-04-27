import { Product_Price } from '../../model/index.js'

const getAllProductPrices = async (req, res) => {
    try {
        const productPrices = await Product_Price.findAll()
        if (!productPrices.length)
            return res.status(204).json({ message: 'No Product Prices found.' })
        res.status(200).json({productPrices})
    }
    catch (err) {
        return res.status(200).json({ message: err.message })
    }
}

const createNewProductPrice = async (req, res) => {
    const {product, wholeSalePrice, retailPrice, isActive} = req.body
    if (!product || !wholeSalePrice || !retailPrice)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        // Check for duplicates
        const duplicate = await Product_Price.findOne({ where: { productId: product, wholeSalePrice: wholeSalePrice, retailPrice: retailPrice }})
        if (duplicate) return res.status(409).json({ message: 'Conflict' })

        const result = await Product_Price.create({
            productId: product,
            wholeSalePrice: wholeSalePrice,
            retailPrice: retailPrice,
            isActive: isActive
        })
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updateProductPrice = async (req, res) => {
    const {id, product, wholeSalePrice, retailPrice, isActive} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const productPrice = await Product_Price.findByPk(id)
        if (!productPrice)
            return res.status(204).json({ message: `No Product Price matches ID ${id}.` })

        if (product) productPrice.productId = product
        if (wholeSalePrice) productPrice.wholeSalePrice = wholeSalePrice
        if (retailPrice) productPrice.retailPrice = retailPrice
        productPrice.isActive = !!isActive
        const result = await productPrice.save()
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteProductPrice = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'ProductPrice ID required.'})

    try {
        const productPrice = await Product_Price.findByPk(req.params.id)
        if (!productPrice)
            return res.status(204).json({message: `No Product Price matches ID ${req.params.id}.`})

        await  productPrice.destroy()
        res.status(201).json(productPrice)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getProductPrice = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'ProductPrice ID required.'})

    try {
        const productPrice = await Product_Price.findByPk(req.params.id)
        if (!productPrice)
            return res.status(204).json({message: `No Product Price matches ID ${req.params.id}.`})

        res.status(201).json(productPrice)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllProductPrices,
    createNewProductPrice,
    updateProductPrice,
    deleteProductPrice,
    getProductPrice
}