import Cheque from "./Cheque.js"
import Client from "./Client.js"
import Company from "./Company.js"
import Order from "./Order.js"
import Payment from "./Payment.js"
import Product from "./Product.js"
import Purchase from "./Purchase.js"
import RefreshToken from "./RefreshToken.js"
import User from "./User.js"

// ---------- *._.* Table Associations *._.* ---------- \\

// Cheque Associations
Cheque.belongsTo(Company, {
    foreignKey: 'companyId',
    as: 'company'
})


// Client Associations


// Company Associations
Company.hasMany(Cheque, {
    foreignKey: 'companyId',
    as: 'cheques',
})
Company.hasMany(Order, {
    foreignKey: 'companyId',
    as: 'orders',
})
Company.hasMany(Product, {
    foreignKey: 'manufacturerId',
    as: 'products',
})
Company.hasMany(Product, {
    foreignKey: 'distributorId',
    as: 'products',
})
Company.hasMany(Purchase, {
    foreignKey: 'companyId',
    as: 'purchases',
})


// Order Associations
Order.belongsTo(Company, {
    foreignKey: 'companyId',
    as: 'company'
})


// Payment Associations


// Product Associations
Product.belongsTo(Company, {
    foreignKey: 'manufacturerId',
    as: 'manufacturer'
})
Product.belongsTo(Company, {
    foreignKey: 'distributorId',
    as: 'distributor'
})


// Purchase Associations
Purchase.belongsTo(Company, {
    foreignKey: 'companyId',
    as: 'company'
})


// RefreshToken Associations
RefreshToken.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
})


// User Associations
User.hasMany(RefreshToken, {
    foreignKey: 'userId',
    as: 'refreshTokens',
    onDelete: 'CASCADE',
})


// ---------- *._.* Mapping Associations *._.* ---------- \\



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