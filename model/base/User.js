import { DataTypes } from 'sequelize'
import sequelize from '../../config/dbConn.js'
import ROLES_LIST from '../../config/roles_list.js'

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roles: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [ROLES_LIST.Client]
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    defaultScope: {
        attributes: { exclude: ['password'] }
    },
    scopes: {
        withPassword: {
            attributes: {}
        }
    }
})

export default User
