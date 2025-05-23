import { DataTypes } from 'sequelize'
import sequelize from '../../config/dbConn.js'

const Order_Purchase = sequelize.define('order_purchase', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    purchaseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true
    }
}, { timestamps: true })

export default Order_Purchase