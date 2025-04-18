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

// Client Associations

// Company Associations
Company.hasMany(Cheque, { foreignKey: 'companyId', as: 'cheques' })
Company.hasMany(Order, { foreignKey: 'companyId', as: 'orders' })
Company.hasMany(Product, { foreignKey: 'manufacturerId', as: 'products' })
Company.hasMany(Product, { foreignKey: 'distributorId', as: 'products' })
Company.hasMany(Purchase, { foreignKey: 'companyId', as: 'purchases' })

// Order Associations
Order.belongsTo(Company, { foreignKey: 'companyId', as: 'company' })

// Payment Associations

// Product Associations
Product.belongsTo(Company, { foreignKey: 'manufacturerId', as: 'manufacturer' })
Product.belongsTo(Company, { foreignKey: 'distributorId', as: 'distributor' })


// Purchase Associations
Purchase.belongsTo(Company, { foreignKey: 'companyId', as: 'company' })


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


// Order_Purchase Associations


// Payment_Cheque Associations


// Payment_Purchase Associations


// Product_Price Associations


// Purchase_Product Associations



// Export models
export {
    // base models
    Cheque, Client, Order, Payment, Product, Purchase, RefreshToken, User,

    // inventory models
    BonusInventory, BrokenInventory, ExpireInventory, PrimaryInventory, RefundInventory, ReturnInventory, SecondaryInventory,

    // mapping models
    Order_Product, Order_Purchase, Payment_Cheque, Payment_Purchase, Product_Price, Purchase_Product,
}