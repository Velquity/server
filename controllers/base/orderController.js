import { Order } from '../../model/index.js'

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.findAll()
        if (!orders.length)
            return res.status(204).json({message: 'No Orders found.'})
        res.status(200).json(orders)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createNewOrder = async (req, res) => {
    const {company, amount, expectedDate, status} = req.body
    if (!company || !amount || !expectedDate || !status)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        const result = await Order.create({
            company: company,
            amount: amount,
            expectedDate: expectedDate,
            status: status
        })
        res.status(201).json(result)
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updateOrder = async (req, res) => {
    const {id,company, amount, expectedDate, status} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const order = await Order.findByPk(id)
        if (!order)
            return res.status(204).json({ message: `No Order matches ID ${id}.` })

        if (company) order.companyId = company
        if (amount) order.amount = amount
        if (expectedDate) order.expectedDate = expectedDate
        if (status) order.status = status
        const result = await order.save()
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteOrder = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'ID parameter is required.'})

    try {
        const order = await Order.findByPk(req.params.id)
        if (!order)
            return res.status(204).json({message: `No Order matches ID ${req.params.id}.`})

        await order.destroy()
        res.status(201).json({ message: 'Order deleted' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getOrder = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'Order ID required.'})

    try {
        const order = await Order.findByPk(req.params.id)
        if (!order)
            return res.status(204).json({message: `No Order matches ID ${req.params.id}.`})

        res.status(201).json(order)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllOrder,
    createNewOrder,
    updateOrder,
    deleteOrder,
    getOrder
}