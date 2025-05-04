import { Cheque } from '../../model/index.js'

const getAllCheques = async () => {
    return await Cheque.findAll()
}

const createNewCheque = async (insta, company, amount, status) => {
    return await Cheque.create({
        insta: insta,
        company: company,
        amount: amount,
        status: status,
    })
}

const updateCheque = async (cheque, insta, company, amount, status) => {
    if (insta) cheque.insta = insta
    if (company) cheque.company = company
    if (amount) cheque.amount = amount
    if (status) cheque.status = status

    return await cheque.save()
}

const getChequeByPk = async (id) => {
    return await Cheque.findByPk(id)
}

const updateChequeStatus = async (cheque, status) => {
    const chequeInsta = cheque.insta
    const prevStatus = cheque.status

    cheque.status = status
    const result = await cheque.save()
    return ({
        message: `Cheque ${chequeInsta} status changed from ${prevStatus} to ${status}`,
        result
    })
}

export {
    getAllCheques,
    createNewCheque,
    updateCheque,
    getChequeByPk,
    updateChequeStatus
}