import { DataTypes } from 'sequelize'
import sequelize from '../../config/dbConn.js'
import brokenReason from "../../config/enum/BrokenInventoryReason.js"

const BrokenInventory = sequelize.define('broken_inventory', {
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
    reason: {
        type: DataTypes.ENUM(...brokenReason),
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true
    }
}, { timestamps: true })

export default BrokenInventory