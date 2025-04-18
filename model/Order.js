import { DataTypes } from 'sequelize'
import sequelize from '../config/dbConn.js'
import orderStatus from '../config/enum/orderStatus.js'

const Order = sequelize.define('Purchase', {
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    expectedDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(...orderStatus),
        allowNull: false,
        default: 'created'
    }
}, { timestamps: true })

export default Order