import { Purchase_Product } from '../../model/index.js'

const getAllPurchaseProducts = async (req, res) => {
    try {
        const purchaseProduct = await Purchase_Product.findAll()
        if (!purchaseProduct.length)
            return res.status(204).json({ message: 'No Purchase Product found.' })
        res.status(200).json({purchaseProduct})
    }
    catch (err) {
        return res.status(200).json({ message: err.message })
    }
}

const createNewPurchaseProduct = async (req, res) => {
    const {purchase, product, amount, bonus, priceVersion, expiredAt, isActive} = req.body
    if (!purchase || !product || !amount || !priceVersion || !expiredAt)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        // Check for duplicates
        const duplicate = await Purchase_Product.findOne({ where: { purchaseId: purchase, productId: product }})
        if (duplicate) return res.status(409).json({ message: 'Conflict' })

        const result = await Purchase_Product.create({
            purchaseId: purchase,
            productId: product,
            amount: amount,
            bonus: bonus,
            priceVersion: priceVersion,
            expiredAt: expiredAt,
            isActive: isActive
        })
        res.status(201).json(result)
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updatePurchaseProduct = async (req, res) => {
    const {id, purchase, product, amount, bonus, priceVersion, expiredAt, isActive} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const purchaseProduct = await Purchase_Product.findByPk(id)
        if (!purchaseProduct)
            return res.status(204).json({ message: `No Purchase Product matches ID ${id}.` })

        if (purchase) purchaseProduct.purchaseId = purchase
        if (product) purchaseProduct.productId = product
        if (amount) purchaseProduct.amount = amount
        if (bonus) purchaseProduct.bonus = bonus
        if (priceVersion) purchaseProduct.priceVersion = priceVersion
        if (expiredAt) purchaseProduct.expiredAt = expiredAt
        purchaseProduct.isActive = !!isActive
        const result = await purchaseProduct.save()
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deletePurchaseProduct = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'PurchaseProduct ID required.'})

    try {
        const purchaseProduct = await Purchase_Product.findByPk(req.params.id)
        if (!purchaseProduct)
            return res.status(204).json({message: `No Purchase Product matches ID ${req.params.id}.`})

        await purchaseProduct.destroy()
        res.status(201).json(purchaseProduct)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getPurchaseProduct = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'PurchaseProduct ID required.'})

    try {
        const purchaseProduct = await Purchase_Product.findByPk(req.params.id)
        if (!purchaseProduct)
            return res.status(204).json({message: `No Purchase Product matches ID ${req.params.id}.`})

        res.status(201).json(purchaseProduct)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllPurchaseProducts,
    createNewPurchaseProduct,
    updatePurchaseProduct,
    deletePurchaseProduct,
    getPurchaseProduct
}