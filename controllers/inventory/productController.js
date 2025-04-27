import { Product } from '../../model/index.js'

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        if (!products.length)
            return res.status(204).json({message: 'No Products found.'})
        res.status(200).json(products)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createNewProduct = async (req, res) => {
    const {name, manufacturer, distributor, category, subcategory} = req.body
    if (!name || !manufacturer || !distributor || !category || !subcategory)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        const result = await Product.create({
            name: name,
            manufacturerId: manufacturer,
            distributorId: distributor,
            category: category,
            subcategory: subcategory,
        })
        res.status(201).json(result)
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updateProduct = async (req, res) => {
    const {id, name, manufacturer, distributor, category, subcategory} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const product = await Product.findByPk(id)
        if (!product)
            return res.status(204).json({ message: `No Product matches ID ${id}.` })

        if (name) product.name = name
        if (manufacturer) product.manufacturerId = manufacturer
        if (distributor) product.distributorId = distributor
        if (category) product.category = category
        if (subcategory) product.subcategory = subcategory
        const result = await product.save()
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params
    if (!id)
        return res.status(400).json({message: 'ID parameter is required.'})

    try {
        const product = await Product.findByPk(id)
        if (!product)
            return res.status(204).json({message: `No Product matches ID ${id}.`})

        await product.destroy()
        res.status(201).json({ message: 'Cheque deleted' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getProduct = async (req, res) => {
    const {id} = req.params
    if (!id)
        return res.status(400).json({message: 'ID parameter is required.'})

    try {
        const product = await Product.findByPk(id)
        if (!product)
            return res.status(204).json({message: `No Product matches ID ${id}.`})

        res.status(201).json(product)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct
}