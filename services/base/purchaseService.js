import { Purchase } from '../../model/index.js'

const getAllPurchases = async () => {
    return await Purchase.findAll()
}

const getPurchaseByPk = async (id) => {
    return await Purchase.findByPk(id)
}

const findDuplicate = async (company, ref) => {
    return await Purchase.findOne({ where: { company: company, ref: ref } })
}

const createNewPurchase = async (name, company, ref, amount, creditDays, deliveryDate, dueDate, status) => {
    return await Purchase.create({
        company: company,
        ref: ref,
        amount: amount,
        creditDays: creditDays,
        deliveryDate: deliveryDate,
        dueDate: dueDate,
        status: status
    })
}

const updatePurchase = async (purchase, company, ref, amount, creditDays, deliveryDate, dueDate, status) => {
    if (company) purchase.companyId = company
    if (ref) purchase.ref = ref
    if (amount) purchase.amount = amount
    if (creditDays) purchase.creditDays = creditDays
    if (deliveryDate) purchase.deliveryDate = deliveryDate
    if (dueDate) purchase.dueDate = dueDate
    if (status) purchase.status = status
    const result = await purchase.save()

    return await purchase.save()
}

const changePurchaseStatus = async (purchase, status) => {
    const prevStatus = purchase.status

    purchase.status = status
    const result = await purchase.save()
    return ({
        message: `Purchase availability changed from ${prevStatus} to ${status}`,
        result
    })
}

export {
    getAllPurchases,
    getPurchaseByPk,
    findDuplicate,
    createNewPurchase,
    updatePurchase,
    changePurchaseStatus,
}