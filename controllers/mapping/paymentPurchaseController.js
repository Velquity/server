import { Payment_Purchase } from '../../model/index.js'

const getAllPaymentPurchase = async (req, res) => {
    try {
        const paymentPurchase = await Payment_Purchase.findAll()
        if (!paymentPurchase.length)
            return res.status(204).json({ message: 'No Payment Purchase found.' })
        res.status(200).json({paymentPurchase})
    }
    catch (err) {
        return res.status(200).json({ message: err.message })
    }
}

const createNewPaymentPurchase = async (req, res) => {
    const {payment, purchase, isActive} = req.body
    if (!payment || !purchase )
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        // Check for duplicates
        const duplicate = await Payment_Purchase.findOne({ where: { paymentId: payment, purchaseId: purchase }})
        if (duplicate) return res.status(409).json({ message: 'Conflict' })

        const result = await Payment_Purchase.create({
            paymentId: payment,
            purchaseId: purchase,
            isActive: isActive
        })
        res.status(201).json(result)
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updatePaymentPurchase = async (req, res) => {
    const {id, payment, purchase, isActive} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const paymentPurchase = await Payment_Purchase.findByPk(id)
        if (!paymentPurchase)
            return res.status(204).json({ message: `No Payment Purchase matches ID ${id}.` })

        if (payment) paymentPurchase.paymentId = payment
        if (purchase) paymentPurchase.productId = purchase
        paymentPurchase.isActive = !!isActive
        const result = await paymentPurchase.save()
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deletePaymentPurchase = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'PaymentPurchase ID required.'})

    try {
        const paymentPurchase = await Payment_Purchase.findByPk(req.params.id)
        if (!paymentPurchase)
            return res.status(204).json({message: `No Payment Purchase matches ID ${req.params.id}.`})

        await paymentPurchase.destroy()
        res.status(201).json(paymentPurchase)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getPaymentPurchase = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'PaymentPurchase ID required.'})

    try {
        const paymentPurchase = await Payment_Purchase.findByPk(req.params.id)
        if (!paymentPurchase)
            return res.status(204).json({message: `No Payment Purchase matches ID ${req.params.id}.`})

        res.status(201).json(paymentPurchase)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllPaymentPurchase,
    createNewPaymentPurchase,
    updatePaymentPurchase,
    deletePaymentPurchase,
    getPaymentPurchase
}