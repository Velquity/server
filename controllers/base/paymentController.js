import { Payment } from '../../model/index.js'

const getAllPayment = async (req, res) => {
    try {
        const payments = await Payment.findAll()
        if (!payments.length)
            return res.status(204).json({message: 'No Orders found.'})
        res.status(200).json(payments)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createNewPayment = async (req, res) => {
    const {company, amount, dueDate, status} = req.body
    if (!company || !amount || !dueDate || !status)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        const result = await Payment.create({
            company: company,
            amount: amount,
            dueDate: dueDate,
            status: status
        })
        res.status(201).json(result)
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updatePayment = async (req, res) => {
    const {id,company, amount, dueDate, status} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const payment = await Payment.findByPk(id)
        if (!payment)
            return res.status(204).json({ message: `No Payment matches ID ${id}.` })

        if (company) payment.companyId = company
        if (amount) payment.amount = amount
        if (dueDate) payment.dueDate = dueDate
        if (status) payment.status = status
        const result = await payment.save()
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deletePayment = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'ID parameter is required.'})

    try {
        const payment = await Payment.findByPk(req.params.id)
        if (!payment)
            return res.status(204).json({message: `No Payment matches ID ${req.params.id}.`})

        await payment.destroy()
        res.status(201).json({ message: 'Payment deleted' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getPayment = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'Payment ID required.'})

    try {
        const payment = await Payment.findByPk(req.params.id)
        if (!payment)
            return res.status(204).json({message: `No Payment matches ID ${req.params.id}.`})

        res.status(201).json(payment)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllPayment,
    createNewPayment,
    updatePayment,
    deletePayment,
    getPayment
}