import { Payment} from '../../model/index.js'

const getAllPayments = async () => {
    return await Payment.findAll()
}

const getPaymentByPk = async (id) => {
    return await Payment.findByPk(id)
}

const createNewPayment= async (company, amount, dueDate, status) => {
    return await Payment.create({
        company: company,
        amount: amount,
        dueDate: dueDate,
        status: status
    })
}

const updatePayment = async (payment, company, amount, dueDate, status) => {
    if (company) payment.companyId = company
    if (amount) payment.amount = amount
    if (dueDate) payment.dueDate = dueDate
    if (status) payment.status = status
    return await payment.save()
}

const updatePaymentStatus = async (payment, status) => {
    const prevStatus = payment.status
    payment.status = status
    const result = await payment.save()
    return ({
        message: `Payment status changed from ${prevStatus} to ${status}`,
        result
    })
}

export {
    getAllPayments,
    getPaymentByPk,
    createNewPayment,
    updatePayment,
    updatePaymentStatus,
}