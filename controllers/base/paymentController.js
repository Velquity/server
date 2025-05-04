import * as paymentService from '../../services/base/paymentService.js'
import {updatePaymentStatus} from "../../services/base/paymentService.js";

const getAllPayment = async (req, res) => {
    try {
        const payments = await paymentService.getAllPayments()
        if (!payments.length)
            return res.status(204).json({message: 'No Payments found.'})
        res.status(200).json(payments)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getOnePayment = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'Payment ID required.'})

    try {
        const payment = await paymentService.getPaymentByPk(req.params.id)
        if (!payment)
            return res.status(204).json({message: `No Payment matches ID ${req.params.id}.`})

        res.status(201).json(payment)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createNewPayment = async (req, res) => {
    const {company, amount, dueDate, status} = req.body
    if (!company || !amount || !dueDate || !status)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        const result = await paymentService.createNewPayment(company, amount, dueDate, status)
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
        const payment = await paymentService.getPaymentByPk(id)
        if (!payment)
            return res.status(204).json({ message: `No Payment matches ID ${id}.` })

        const result = await paymentService.updatePaymentStatus(company, amount, dueDate, status)
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
        const payment = await paymentService.getPaymentByPk(req.params.id)
        if (!payment)
            return res.status(204).json({message: `No Payment matches ID ${req.params.id}.`})

        const result = await updatePaymentStatus(payment, 'deleted')
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllPayment,
    getOnePayment,
    createNewPayment,
    updatePayment,
    deletePayment,
}