import { DataTypes } from 'sequelize'
import sequelize from '../../config/dbConn.js'

const Order_Product = sequelize.define('order_product', {
    orderId: {
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
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true
    }
}, { timestamps: true })

export default Order_Product