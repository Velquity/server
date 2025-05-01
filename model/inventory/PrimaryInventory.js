import { DataTypes } from 'sequelize'
import sequelize from '../../config/dbConn.js'

const PrimaryInventory = sequelize.define('primary_inventory', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    priceVersion: {                     // Product_Price Association
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

export default PrimaryInventory