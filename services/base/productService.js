import { Product } from '../../model/index.js'

const getAllProducts = async () => {
    return await Product.findAll()
}

const getProductByPk = async (id) => {
    return await Product.findByPk(id)
}

const findDuplicate = async (name, category, subCategory) => {
    return await Product.findOne({ where: { name: name, category: category, subCategory: subCategory } })
}

const createNewProduct = async (name, manufacturer, distributor, category, subCategory, isAvailable) => {
    return await Product.create({
        name: name,
        manufacturerId: manufacturer,
        distributorId: distributor,
        category: category,
        subCategory: subCategory,
        isAvailable: isAvailable
    })
}

const updateProduct = async (product, name, manufacturer, distributor, category, subCategory, isAvailable) => {
    if (name) product.name = name
    if (manufacturer) product.manufacturerId = manufacturer
    if (distributor) product.distributorId = distributor
    if (category) product.category = category
    if (subCategory) product.subcategory = subcategory
    product.isAvailable = !!isAvailable

    return await product.save()
}

const changeProductStatus = async (product, status) => {
    const prevStatus = product.isAvailable

    product.isAvailable = status
    const result = await product.save()
    return ({
        message: `Product availability changed from ${prevStatus} to ${status}`,
        result
    })
}

export {
    getAllProducts,
    getProductByPk,
    findDuplicate,
    createNewProduct,
    updateProduct,
    changeProductStatus,
}