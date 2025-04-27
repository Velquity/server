import { Purchase } from '../../model/index.js'
import purchase from "../../model/base/Purchase.js";
import company from "../../model/base/Company.js";

const getAllPurchase = async (req, res) => {
    try {
        const purchases = await Purchase.findAll()
        if (!purchases.length)
            return res.status(204).json({message: 'No Purchases found.'})
        res.status(200).json(purchases)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createNewPurchase = async (req, res) => {
    const {company, ref, amount, creditDays, deliveryDate, dueDate, status} = req.body
    if (!company || !amount || !deliveryDate || !status)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        // Check for duplicates
        const duplicate = await Purchase.findOne({ where: { company: company, ref: ref } })
        if (duplicate) return res.status(409).json({ message: 'Conflict' })

        const result = await Purchase.create({
            company: company,
            ref: ref,
            amount: amount,
            creditDays: creditDays,
            deliveryDate: deliveryDate,
            dueDate: dueDate,
            status: status
        })
        res.status(201).json(result)
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updatePurchase = async (req, res) => {
    const {id, ref, amount, creditDays, deliveryDate, dueDate, status} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const purchase = await Purchase.findByPk(id)
        if (!purchase)
            return res.status(204).json({ message: `No Purchase matches ID ${id}.` })

        if (company) purchase.companyId = company
        if (ref) purchase.ref = ref
        if (amount) purchase.amount = amount
        if (creditDays) purchase.creditDays = creditDays
        if (deliveryDate) purchase.deliveryDate = deliveryDate
        if (dueDate) purchase.dueDate = dueDate
        if (status) purchase.status = status
        const result = await purchase.save()
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
        const purchase = await Purchase.findByPk(req.params.id)
        if (!purchase)
            return res.status(204).json({message: `No Purchase matches ID ${req.params.id}.`})

        await purchase.destroy()
        res.status(201).json({ message: 'Purchase deleted' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getPurchase = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'Purchase ID required.'})

    try {
        const purchase = await Purchase.findByPk(req.params.id)
        if (!purchase)
            return res.status(204).json({message: `No Purchase matches ID ${req.params.id}.`})

        res.status(201).json(purchase)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllPurchase,
    createNewPurchase,
    updatePurchase,
    deletePurchase,
    getPurchase
}