import { Client } from '../../model/base/index.js'

const getAllClients = async (req, res) => {
    const clients = await Client.findAll()
    if (!clients.length)
        return res.status(204).json({ message: 'No clients found.' })
    res.json(clients)
}

const createNewClient = async (req, res) => {
    const { firstname, lastname } = req.body
    if (!firstname || !lastname)
        return res.status(400).json({ message: 'All the fields are required.' })

    try {
        const result = await Client.create({ firstname, lastname })
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateClient = async (req, res) => {
    const { id, firstname, lastname } = req.body
    if (!id)
        return res.status(400).json({ message: 'ID parameter is required.' })

    const client = await Client.findByPk(id)
    if (!client)
        return res.status(204).json({ message: `No employee matches ID ${id}.` })

    if (firstname) client.firstname = firstname
    if (lastname) client.lastname = lastname
    const result = await client.save()
    res.status(201).json(result)
}

const deleteClient = async (req, res) => {
    const { id } = req.body
    if (!id)
        return res.status(400).json({ message: 'Client ID required.' })

    const client = await Client.findByPk(id);
    if (!client)
        return res.status(204).json({ message: `No client matches ID ${id}.` })

    await client.destroy()
    res.status(201).json({ message: 'Client deleted' })
}

const getClient = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).json({ message: 'Client ID required.' })

    const client = await Client.findByPk(id)
    if (!client)
        return res.status(204).json({ message: `No client matches ID ${id}.` })

    res.status(201).json(client)
}

export {
    getAllClients,
    createNewClient,
    updateClient,
    deleteClient,
    getClient
}