import { Company } from '../../model/index.js'

const getAllCompanies = async () => {
    return await Company.findAll()
}

const getCompanyByPk = async (id) => {
    return await Company.findByPk(id)
}

const findDuplicate = async (name) => {
    return await Company.findOne({ where: { name: name } })
}

const createNewCompany = async (name, address, email, creditDays, primaryContact, secondaryContact, isAvailable) => {
    return await Company.create({
        name: name,
        address: address,
        email: email,
        creditDays: creditDays,
        primaryContact: primaryContact,
        secondaryContact: secondaryContact,
        isAvailable: isAvailable
    })
}

const updateCheque = async (company, name, address, email, creditDays, primaryContact, secondaryContact, isAvailable) => {
    if (name) company.name = name
    if (address) company.address = address
    if (email) company.email = email
    if (creditDays) company.creditDays = creditDays
    if (primaryContact) company.primaryContact = primaryContact
    if (secondaryContact) company.secondaryContact = secondaryContact
    company.isAvailable = !!isAvailable

    return await company.save()
}

const changeCompanyStatus = async (company, status) => {
    const prevStatus = company.isAvailable

    company.isAvailable = status
    const result = await company.save()
    return ({
        message: `Company status changed from ${prevStatus} to ${status}`,
        result
    })
}

export {
    getAllCompanies,
    getCompanyByPk,
    findDuplicate,
    createNewCompany,
    updateCheque,
    changeCompanyStatus,
}