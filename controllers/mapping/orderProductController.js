import { Order_Product } from '../../model/index.js'

const getAllOrderProducts = async (req, res) => {
    try {
        const orderProduct = await Order_Product.findAll()
        if (!orderProduct.length)
            return res.status(204).json({ message: 'No Order Product found.' })
        res.status(200).json({orderProduct})
    }
    catch (err) {
        return res.status(200).json({ message: err.message })
    }
}

const createNewOrderProduct = async (req, res) => {
    const {order, product, amount, isActive} = req.body
    if (!order || !product || !amount )
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        // Check for duplicates
        const duplicate = await Order_Product.findOne({ where: { orderId: order, productId: product }})
        if (duplicate) return res.status(409).json({ message: 'Conflict' })

        const result = await Order_Product.create({
            orderId: order,
            productId: product,
            amount: amount,
            isActive: isActive
        })
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updateOrderProduct = async (req, res) => {
    const {id, order, product, amount, isActive} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const orderProduct = await Order_Product.findByPk(id)
        if (!orderProduct)
            return res.status(204).json({ message: `No Order Product matches ID ${id}.` })

        if (order) orderProduct.orderId = order
        if (product) orderProduct.productId = product
        if (amount) orderProduct.amount = amount
        orderProduct.isActive = !!isActive
        const result = await orderProduct.save()
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteOrderProduct = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'OrderProduct ID required.'})

    try {
        const orderProduct = await Order_Product.findByPk(req.params.id)
        if (!orderProduct)
            return res.status(204).json({message: `No Order Product matches ID ${req.params.id}.`})

        await orderProduct.destroy()
        res.status(201).json(orderProduct)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getOrderProduct = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'OrderProduct ID required.'})

    try {
        const orderProduct = await Order_Product.findByPk(req.params.id)
        if (!orderProduct)
            return res.status(204).json({message: `No Order Product matches ID ${req.params.id}.`})

        res.status(201).json(orderProduct)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllOrderProducts,
    createNewOrderProduct,
    updateOrderProduct,
    deleteOrderProduct,
    getOrderProduct
}