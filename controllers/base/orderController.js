import * as orderService from '../../services/base/orderService.js'

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders()
        if (!orders.length)
            return res.status(204).json({message: 'No Orders found.'})
        res.status(200).json(orders)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getOneOrder = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'Order ID required.'})

    try {
        const order = await orderService.getOrderByPk(req.params.id)
        if (!order)
            return res.status(204).json({message: `No Order matches ID ${req.params.id}.`})

        res.status(201).json(order)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createNewOrder = async (req, res) => {
    const {company, amount, expectedDate, status} = req.body
    if (!company || !amount || !expectedDate || !status)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        const result = await orderService.createNewOrder()
        res.status(201).json(result)
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updateOrder = async (req, res) => {
    const {id, company, amount, expectedDate, status} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const order = await orderService.getOrderByPk(id)
        if (!order)
            return res.status(204).json({ message: `No Order matches ID ${id}.` })

        const result = orderService.updateOrder(order, company, amount, expectedDate, status)
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
        const order = await orderService.getOrderByPk(req.params.id)
        if (!order)
            return res.status(204).json({message: `No Order matches ID ${req.params.id}.`})

        const result = await orderService.updateOrderStatus(order, 'deleted')
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllOrders,
    getOneOrder,
    createNewOrder,
    updateOrder,
    deleteOrder,
}