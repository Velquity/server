import Cheque from "./Cheque.js"
import Client from "./Client.js"
import Order from "./Order.js"
import Payment from "./Payment.js"
import Product from "./Product.js"
import Purchase from "./Purchase.js"
import RefreshToken from "./RefreshToken.js"
import User from "./User.js"

// Cheque Associations

// Client Associations

// Order Associations

// Payment Associations

// Product Associations

// Purchase Associations

// RefreshToken Associations
RefreshToken.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
})

// User Associations
User.hasMany(RefreshToken, {
    foreignKey: 'userId',
    as: 'refreshTokens',
    onDelete: 'CASCADE',  // When a user is deleted, all associated refresh tokens will be deleted
})

// Export models
export {
    Cheque,
    Client,
    Order,
    Payment,
    Product,
    Purchase,
    RefreshToken,
    User
}