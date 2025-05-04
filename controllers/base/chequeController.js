import * as chequeService from '../../services/base/chequeService.js'

import { Cheque } from '../../model/index.js'

const getAllCheques = async (req, res) => {
    try {
        const cheques = await chequeService.getAllCheques()
        if (!cheques.length)
            return res.status(204).json({message: 'No cheques found.'})
        res.status(200).json(cheques)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getOneCheque = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({ message: 'Cheque ID required.' })

    try {
        const cheque = await chequeService.getChequeByPk(req.params.id)
        if (!cheque)
            return res.status(204).json({message: `No cheque matches ID ${req.params.id}.`})

        res.status(201).json(cheque)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createNewCheque = async (req, res) => {
    const {insta, company, amount, status} = req.body
    if (!insta || !company || !amount || !status)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        const result = await chequeService.createNewCheque(insta, company, amount, status)
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateCheque = async (req, res) => {
    const { id, insta, company, amount, status } = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    try {
        const cheque = await chequeService.getChequeByPk(id)
        if (!cheque)
            return res.status(204).json({message: `No cheque matches ID ${id}.`})

        const result = chequeService.updateCheque(cheque, insta, company, amount, status)
        res.status(201).json(result)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteCheque = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).json({ message: 'Cheque ID required.' })

    try {
        const cheque = chequeService.getChequeByPk(id)
        if (!cheque)
            return res.status(204).json({message: `No cheque matches ID ${id}.`})

        const result = chequeService.updateChequeStatus(cheque, 'deleted')
        res.status(201).json(result)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const changeChequeStatus = async (req, res) => {
    const { id, status } = req.body
    if (!id || !status)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        const cheque = chequeService.getChequeByPk(id)
        if (!cheque)
            return res.status(204).json({message: `No cheque matches ID ${req.params.id}.`})

        const result = chequeService.updateChequeStatus(cheque, status)
        res.status(201).json(result)

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export {
    getAllCheques,
    getOneCheque,
    createNewCheque,
    updateCheque,
    deleteCheque,
    changeChequeStatus
}