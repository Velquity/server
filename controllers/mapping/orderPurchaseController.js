import { Order_Purchase } from '../../model/index.js'

const getAllOrderPurchase = async (req, res) => {
    try {
        const orderPurchase = await Order_Purchase.findAll()
        if (!orderPurchase.length)
            return res.status(204).json({ message: 'No Order Purchase found.' })
        res.status(200).json({orderPurchase})
    }
    catch (err) {
        return res.status(200).json({ message: err.message })
    }
}

const createNewOrderPurchase = async (req, res) => {
    const {order, purchase, isActive} = req.body
    if (!order || !purchase )
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        // Check for duplicates
        const duplicate = await Order_Purchase.findOne({ where: { orderId: order, purchaseId: purchase }})
        if (duplicate) return res.status(409).json({ message: 'Conflict' })

        const result = await Order_Purchase.create({
            orderId: order,
            purchaseId: purchase,
            isActive: isActive
        })
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updateOrderPurchase = async (req, res) => {
    const {id, order, purchase, isActive} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const orderPurchase = await Order_Purchase.findByPk(id)
        if (!orderPurchase)
            return res.status(204).json({ message: `No Order Purchase matches ID ${id}.` })

        if (order) orderPurchase.orderId = order
        if (purchase) orderPurchase.productId = purchase
        orderPurchase.isActive = !!isActive
        const result = await orderPurchase.save()
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteOrderPurchase = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'OrderPurchase ID required.'})

    try {
        const orderPurchase = await Order_Purchase.findByPk(req.params.id)
        if (!orderPurchase)
            return res.status(204).json({message: `No Order Purchase matches ID ${req.params.id}.`})

        await orderPurchase.destroy()
        res.status(201).json(orderPurchase)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getOrderPurchase = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'OrderPurchase ID required.'})

    try {
        const orderPurchase = await Order_Purchase.findByPk(req.params.id)
        if (!orderPurchase)
            return res.status(204).json({message: `No Order Purchase matches ID ${req.params.id}.`})

        res.status(201).json(orderPurchase)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllOrderPurchase,
    createNewOrderPurchase,
    updateOrderPurchase,
    deleteOrderPurchase,
    getOrderPurchase
}