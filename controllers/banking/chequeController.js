import { Cheque } from '../../model/base/index.js'

const getAllCheques = async (req, res) => {
    const cheques = await Cheque.findAll()
    if (!cheques.length)
        return res.status(204).json({ message: 'No cheques found.' })
    res.json(cheques)
}

const createNewCheque = async (req, res) => {
    const {insta, company, amount, status} = req.body
    if (!insta || !company || !amount || !status)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        const result = await Cheque.create({
            insta: insta,
            company: company,
            amount: amount,
            status: status,
        })
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateCheque = async (req, res) => {
    const { id, insta, company, amount, status } = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    const cheque = await Cheque.findByPk(id)
    if (!cheque)
        return res.status(204).json({ message: `No cheque matches ID ${id}.` })

    if (insta) cheque.insta = insta
    if (company) cheque.company = company
    if (amount) cheque.amount = amount
    if (status) cheque.status = status
    const result = await cheque.save()
    res.status(201).json(result)
}

const deleteCheque = async (req, res) => {
    const { id } = req.body
    if (!id)
        return res.status(400).json({ message: 'Cheque ID required.' })

    const cheque = await Cheque.findByPk(id);
    if (!cheque)
        return res.status(204).json({ message: `No cheque matches ID ${id}.` })

    await cheque.destroy()
    res.status(201).json({ message: 'Cheque deleted' })
}

const getCheque = async (req, res) => {
    const { id } = req.body
    if (!id)
        return res.status(400).json({ message: 'Cheque ID required.' })

    const cheque = await Cheque.findByPk(id);
    if (!cheque)
        return res.status(204).json({ message: `No cheque matches ID ${id}.` })

    res.status(201).json(cheque)
}

export {
    getAllCheques,
    createNewCheque,
    updateCheque,
    deleteCheque,
    getCheque
}