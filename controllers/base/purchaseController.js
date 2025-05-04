import * as purchaseService from '../../services/base/purchaseService.js'

const getAllPurchase = async (req, res) => {
    try {
        const purchases = await purchaseService.getAllPurchases()
        if (!purchases.length)
            return res.status(204).json({message: 'No Purchases found.'})
        res.status(200).json(purchases)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getOnePurchase = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'Purchase ID required.'})

    try {
        const purchase = await purchaseService.getPurchaseByPk(req.params.id)
        if (!purchase)
            return res.status(204).json({message: `No Purchase matches ID ${req.params.id}.`})

        res.status(201).json(purchase)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createNewPurchase = async (req, res) => {
    const {company, ref, amount, creditDays, deliveryDate, dueDate, status} = req.body
    if (!company || !amount || !deliveryDate || !status)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
       const duplicate = await purchaseService.findDuplicate(company, ref)
        if (duplicate) return res.status(409).json({ message: 'Conflict' })

        const result = await purchaseService.createNewPurchase(company, ref, amount, creditDays, deliveryDate, dueDate, status)
        res.status(201).json(result)
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updatePurchase = async (req, res) => {
    const {id, company, ref, amount, creditDays, deliveryDate, dueDate, status} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const purchase = await purchaseService.getPurchaseByPk(id)
        if (!purchase)
            return res.status(204).json({ message: `No Purchase matches ID ${id}.` })

        const result = await purchaseService.updatePurchase(purchase, company, ref, amount, creditDays, deliveryDate, dueDate, status)
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deletePurchase = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'ID parameter is required.'})

    try {
        const purchase = await purchaseService.getPurchaseByPk(req.params.id)
        if (!purchase)
            return res.status(204).json({message: `No Purchase matches ID ${req.params.id}.`})

        const result = await purchaseService.changePurchaseStatus(purchase, 'delete')
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllPurchase,
    getOnePurchase,
    createNewPurchase,
    updatePurchase,
    deletePurchase,
}