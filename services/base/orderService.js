import { Order } from '../../model/index.js'

const getAllOrders = async () => {
    return await Order.findAll()
}

const getOrderByPk = async (id) => {
    return await Order.findByPk(id)
}

const createNewOrder = async (company, amount, expectedDate, status) => {
    return await Order.create({
        company: company,
        amount: amount,
        expectedDate: expectedDate,
        status: status
    })
}

const updateOrder = async (order, company, amount, expectedDate, status) => {
    if (company) order.companyId = company
    if (amount) order.amount = amount
    if (expectedDate) order.expectedDate = expectedDate
    if (status) order.status = status
    return await order.save()
}

const updateOrderStatus = async (order, status) => {
    const prevStatus = order.status

    order.status = status
    const result = await order.save()
    return ({
        message: `Order status changed from ${prevStatus} to ${status}`,
        result
    })
}

export {
    getAllOrders,
    getOrderByPk,
    createNewOrder,
    updateOrder,
    updateOrderStatus,
}