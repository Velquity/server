import { Product } from '../../model/index.js'

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        if (!products.length)
            return res.status(204).json({message: 'No Products found.'})
        res.status(200).json(products)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

