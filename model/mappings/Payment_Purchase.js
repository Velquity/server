import { DataTypes } from 'sequelize'
import sequelize from '../../config/dbConn.js'

const Payment_Purchase = sequelize.define('payment_purchase', {
    paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    purchaseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isValid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true
    }
})

export default Payment_Purchase