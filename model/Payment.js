import { DataTypes } from 'sequelize'
import sequelize from '../config/dbConn.js'
import paymentStatus from '../config/enum/paymentStatus.js'

const Payment = sequelize.define('payment', {
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(...paymentStatus),
        allowNull: false,
        default: 'created'
    }
}, { timestamps: true })

export default Payment