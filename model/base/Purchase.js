import { DataTypes } from 'sequelize'
import sequelize from '../../config/dbConn.js'
import purchaseStatus from '../../config/enum/purchaseStatus.js'

const Purchase = sequelize.define('Purchase', {
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ref: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    creditDays: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deliveryDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM(...purchaseStatus),
        allowNull: false,
        default: 'delivered'
    }
}, { timestamps: true })

export default Purchase