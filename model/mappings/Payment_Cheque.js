import { DataTypes } from 'sequelize'
import sequelize from '../../config/dbConn.js'

const Payment_Cheque = sequelize.define('payment_cheque', {
    paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chequeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isValid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true
    }
}, { timestamps: true })

export default Payment_Cheque