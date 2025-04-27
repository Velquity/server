// Imports: base models
import Cheque from "./base/Cheque.js"
import Client from "./base/Client.js"
import Company from "./base/Company.js"
import Order from "./base/Order.js"
import Payment from "./base/Payment.js"
import Product from "./base/Product.js"
import Purchase from "./base/Purchase.js"
import RefreshToken from "./base/RefreshToken.js"
import User from "./base/User.js"

// Imports: inventory models
import BonusInventory from "./inventory/BonusInventory.js"
import BrokenInventory from "./inventory/BrokenInventory.js"
import ExpireInventory from "./inventory/ExpireInventory.js"
import PrimaryInventory from "./inventory/PrimaryInventory.js"
import RefundInventory from "./inventory/RefundInventory.js"
import ReturnInventory from "./inventory/ReturnInventory.js"
import SecondaryInventory from "./inventory/SecondaryInventory.js"

// Imports: mapping models
import Order_Product from "./mappings/Order_Product.js"
import Order_Purchase from "./mappings/Order_Purchase.js"
import Payment_Cheque from "./mappings/Payment_Cheque.js"
import Payment_Purchase from "./mappings/Payment_Purchase.js"
import Product_Price from "./mappings/Product_Price.js"
import Purchase_Product from "./mappings/Purchase_Product.js"


// *._.*._.*._.*._.* Table Associations *._.*._.*._.*._.* \\

// Cheque Associations
Cheque.belongsTo(Company, { foreignKey: 'companyId', as: 'company' })

Cheque.belongsToMany(Payment, {
    through: Payment_Cheque,
    foreignKey: 'chequeId',
    otherKey: 'paymentId',
    as: 'payments'
})


// Client Associations

// Company Associations
Company.hasMany(Cheque, { foreignKey: 'companyId', as: 'cheques' })
Company.hasMany(Order, { foreignKey: 'companyId', as: 'orders' })
Company.hasMany(Product, { foreignKey: 'manufacturerId', as: 'manufacturedProducts' })
Company.hasMany(Product, { foreignKey: 'distributorId', as: 'distributedProducts' })
Company.hasMany(Purchase, { foreignKey: 'companyId', as: 'purchases' })

// Order Associations
Order.belongsTo(Company, { foreignKey: 'companyId', as: 'company' })

Order.belongsToMany(Product, {
    through: Order_Product,
    foreignKey: 'orderId',
    otherKey: 'productId',
    as: 'products'
})
Order.belongsToMany(Purchase, {
    through: Order_Purchase,
    foreignKey: 'orderId',
    otherKey: 'purchaseId',
    as: 'purchases'
})


// Payment Associations
Payment.belongsToMany(Cheque, {
    through: Payment_Cheque,
    foreignKey: 'paymentId',
    otherKey: 'chequeId',
    as: 'cheques'
})
Payment.belongsToMany(Purchase, {
    through: Payment_Purchase,
    foreignKey: 'paymentId',
    otherKey: 'purchaseId',
    as: 'purchases'
})


// Product Associations
Product.belongsTo(Company, { foreignKey: 'manufacturerId', as: 'manufacturer' })
Product.belongsTo(Company, { foreignKey: 'distributorId', as: 'distributor' })

Product.belongsToMany(Order, {
    through: Order_Product,
    foreignKey: 'productId',
    otherKey: 'orderId',
    as: 'orders'
})
Product.belongsToMany(Purchase, {
    through: Purchase_Product,
    foreignKey: 'productId',
    otherKey: 'purchaseId',
    as: 'purchases'
})


// Purchase Associations
Purchase.belongsTo(Company, { foreignKey: 'companyId', as: 'company' })

Purchase.belongsToMany(Order, {
    through: Order_Purchase,
    foreignKey: 'purchaseId',
    otherKey: 'orderId',
    as: 'orders'
})
Purchase.belongsToMany(Payment, {
    through: Payment_Purchase,
    foreignKey: 'purchaseId',
    otherKey: 'paymentId',
    as: 'payments'
})
Purchase.belongsToMany(Product, {
    through: Purchase_Product,
    foreignKey: 'purchaseId',
    otherKey: 'productId',
    as: 'products'
})


// RefreshToken Associations
RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'user' })

// User Associations
User.hasMany(RefreshToken, { foreignKey: 'userId', as: 'refreshTokens', onDelete: 'CASCADE' })


// *._.*._.*._.*._.* Inventory Associations *._.*._.*._.*._.* \\

// BonusInventory Associations


// BrokenInventory Associations


// ExpireInventory Associations


// PrimaryInventory Associations


// RefundInventory Associations


// ReturnInventory Associations


// SecondaryInventory Associations



// *._.*._.*._.*._.* Mapping Associations *._.*._.*._.*._.* \\

// Order_Product Associations
Order_Product.belongsTo(Order, { foreignKey: 'orderId', as: 'order' })
Order_Product.belongsTo(Product, { foreignKey: 'productId', as: 'product' })

// Order_Purchase Associations
Order_Purchase.belongsTo(Order, { foreignKey: 'orderId', as: 'order' })
Order_Purchase.belongsTo(Purchase, { foreignKey: 'purchaseId', as: 'purchase' })

// Payment_Cheque Associations
Payment_Cheque.belongsTo(Payment, { foreignKey: 'paymentId', as: 'payments' })
Payment_Cheque.belongsTo(Cheque, { foreignKey: 'chequeId', as: 'cheques' })

// Payment_Purchase Associations
Payment_Purchase.belongsTo(Payment, { foreignKey: 'paymentId', as: 'payments' })
Payment_Purchase.belongsTo(Purchase, { foreignKey: 'purchaseId', as: 'purchase' })

// Product_Price Associations
Product_Price.belongsTo(Product, { foreignKey: 'productId', as: 'product' })
Product_Price.hasMany(Purchase_Product, { foreignKey: 'priceVersion', as: 'purchase' })

// Purchase_Product Associations
Purchase_Product.belongsTo(Purchase, { foreignKey: 'purchaseId', as: 'purchase' })
Purchase_Product.belongsTo(Product, { foreignKey: 'productId', as: 'product' })
Purchase_Product.belongsTo(Product_Price, { foreignKey: 'priceVersion', as: 'prices' })


// Export models
export {
    // base models
    Cheque, Client, Company, Order, Payment, Product, Purchase, RefreshToken, User,

    // inventory models
    BonusInventory, BrokenInventory, ExpireInventory, PrimaryInventory, RefundInventory, ReturnInventory, SecondaryInventory,

    // mapping models
    Order_Product, Order_Purchase, Payment_Cheque, Payment_Purchase, Product_Price, Purchase_Product,
}