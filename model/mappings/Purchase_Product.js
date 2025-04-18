import { DataTypes } from 'sequelize'
import sequelize from '../../config/dbConn.js'

const Purchase_Product = sequelize.define('purchase_product', {
    purchaseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bonus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0
    },
    priceVersion: {                 // Product_Price Association
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expiredAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true
    }
})

export default Purchase_Product