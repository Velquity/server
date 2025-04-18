import { DataTypes } from 'sequelize'
import sequelize from '../../config/dbConn.js'
import productCategory from '../../config/enum/productCategory.js'
import productSubCategory from '../../config/enum/productSubCategory.js'

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manufacturerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    distributorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM(...productCategory),
        allowNull: false,
        default: 'other'
    },
    subCategory: {
        type: DataTypes.ENUM(...productSubCategory),
        allowNull: false,
        default: 'other'
    }
}, { timestamps: true })

export default Product