import * as companyService from '../../services/base/companyService.js'

const getAllCompanies = async (req, res) => {
    try {
        const companies = await companyService.getAllCompanies()
        if (!companies.length)
            return res.status(204).json({message: 'No Companies found.'})
        res.status(200).json(companies)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getOneCompany = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'Company ID required.'})

    try {
        const company = await companyService.getCompanyByPk(req.params.id)
        if (!company)
            return res.status(204).json({message: `No Company matches ID ${req.params.id}.`})

        res.status(201).json(company)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createNewCompany = async (req, res) => {
    const {name, address, email, creditDays, primaryContact, secondaryContact, isAvailable} = req.body
    if (!name || !address || !primaryContact)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        // Check for duplicates
        const duplicate = await companyService.findDuplicate(name)
        if (duplicate) return res.status(409).json({ message: 'Conflict' })

        const result = await companyService.createNewCompany(name, address, email, creditDays, primaryContact, secondaryContact, isAvailable)
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
        const company = await companyService.getCompanyByPk(id)
        if (!company)
            return res.status(204).json({ message: `No Company matches ID ${id}.` })

        const result = await companyService.updateCompany(company, name, address, email, creditDays, primaryContact, secondaryContact, isAvailable)
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteCompany = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({message: 'ID parameter is required.'})

    try {
        const company = await companyService.getCompanyByPk(req.params.id)
        if (!company)
            return res.status(204).json({message: `No Company matches ID ${req.params.id}.`})

        const result = await companyService.changeCompanyStatus(company, false)
        res.status(201).json(result)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    getAllCompanies,
    getOneCompany,
    createNewCompany,
    updateCompany,
    deleteCompany
}