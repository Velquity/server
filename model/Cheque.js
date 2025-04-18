import { DataTypes } from 'sequelize'
import sequelize from '../config/dbConn.js'
import chequeStatus from "../config/enum/chequeStatus.js"

const Cheque = sequelize.define('Cheque', {
    insta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyId: {
        type: DataTypes.STRING,
        allowNull: false,
        default: 'Cash'
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(...chequeStatus),
        allowNull: false,
        default: 'created'
    }
}, { timestamps: true })

export default Cheque