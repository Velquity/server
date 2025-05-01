import { DataTypes } from 'sequelize'
import sequelize from '../../config/dbConn.js'

const Product_Price = sequelize.define('product_price', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wholeSalePrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    retailPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true
    }
}, { timestamps: true })

export default Product_Price