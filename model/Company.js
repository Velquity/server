import { DataTypes } from 'sequelize'
import sequelize from '../config/dbConn.js'

const Company = sequelize.define('company', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    creditDays: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    primaryContact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    secondaryContact: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true
    }
}, { timestamps: true })

export default Company