import { Company } from '../../model/index.js'

const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll()
        if (!companies.length)
            return res.status(204).json({message: 'No Companies found.'})
        res.status(200).json(companies)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createNewCompany = async (req, res) => {
    const {name, address, email, creditDays, primaryContact, secondaryContact, isAvailable} = req.body
    if (!name || !address || !primaryContact)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        // Check for duplicates
        const duplicate = await Company.findOne({ where: { name: name } })
        if (duplicate) return res.status(409).json({ message: 'Conflict' })

        const result = await Company.create({
            name: name,
            address: address,
            email: email,
            creditDays: creditDays,
            primaryContact: primaryContact,
            secondaryContact: secondaryContact,
            isAvailable: isAvailable
        })
        res.status(201).json(result)
    } catch (err) {
        res.status(501).json({ message: err.message })
    }
}

const updateCompany = async (req, res) => {
    const {id, name, address, email, creditDays, primaryContact, secondaryContact, isAvailable} = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const company = await Company.findByPk(id)
        if (!company)
            return res.status(204).json({ message: `No Company matches ID ${id}.` })

        if (name) Company.name = name
        if (address) Company.address = address
        if (email) Company.email = email
        if (creditDays) Company.creditDays = creditDays
        if (primaryContact) Company.primaryContact = primaryContact
        if (secondaryContact) Company.secondaryContact = secondaryContact
        Company.isAvailable = !!isAvailable
        const result = await Company.save()
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteCompany = async (req, res) => {
    const {id} = req.params
    if (!id)
        return res.status(400).json({message: 'ID parameter is required.'})

    try {
        const company = await Company.findByPk(id)
        if (!company)
            return res.status(204).json({message: `No Company matches ID ${id}.`})

        await company.destroy()
        res.status(201).json({ message: 'Company deleted' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getCompany = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'Company ID required.'})

    try {
        const company = await Company.findByPk(req.params.id)
        if (!company)
            return res.status(204).json({message: `No Company matches ID ${req.params.id}.`})

        res.status(201).json(company)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllCompanies,
    createNewCompany,
    updateCompany,
    deleteCompany,
    getCompany
}