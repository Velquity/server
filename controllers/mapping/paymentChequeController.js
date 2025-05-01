import { Payment_Cheque } from '../../model/index.js'

const getAllPaymentCheque = async (req, res) => {
    try {
        const paymentCheque = await Payment_Cheque.findAll()
        if (!paymentCheque.length)
            return res.status(204).json({ message: 'No Payment Cheque found.' })
        res.status(200).json({paymentCheque})
    }
    catch (err) {
        return res.status(200).json({ message: err.message })
    }
}

const createNewPaymentCheque = async (req, res) => {
    const {payment, cheque, isActive} = req.body
    if (!payment || !cheque )
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        // Check for duplicates
        const duplicate = await Payment_Cheque.findOne({ where: { paymentId: payment, chequeId: purchase }})
        if (duplicate) return res.status(409).json({ message: 'Conflict' })

        const result = await Payment_Cheque.create({
            paymentId: payment,
            chequeId: purchase,
            isActive: isActive
        })
        res.status(201).json(result)
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updatePaymentCheque = async (req, res) => {
    const {id, payment, cheque, isActive} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const paymentCheque = await Payment_Cheque.findByPk(id)
        if (!paymentCheque)
            return res.status(204).json({ message: `No Payment Cheque matches ID ${id}.` })

        if (payment) paymentCheque.paymentId = payment
        if (cheque) paymentCheque.productId = cheque
        paymentCheque.isActive = !!isActive
        const result = await paymentCheque.save()
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deletePaymentCheque = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'PaymentCheque ID required.'})

    try {
        const paymentCheque = await Payment_Cheque.findByPk(req.params.id)
        if (!paymentCheque)
            return res.status(204).json({message: `No Payment Cheque matches ID ${req.params.id}.`})

        await paymentCheque.destroy()
        res.status(201).json(paymentCheque)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getPaymentCheque = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'PaymentCheque ID required.'})

    try {
        const paymentCheque = await Payment_Cheque.findByPk(req.params.id)
        if (!paymentCheque)
            return res.status(204).json({message: `No Payment Cheque matches ID ${req.params.id}.`})

        res.status(201).json(paymentCheque)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllPaymentCheque,
    createNewPaymentCheque,
    updatePaymentCheque,
    deletePaymentCheque,
    getPaymentCheque
}