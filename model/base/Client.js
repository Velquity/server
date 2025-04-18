import { DataTypes } from 'sequelize'
import sequelize from '../../config/dbConn.js'

const Client = sequelize.define('client', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false })

export default Client