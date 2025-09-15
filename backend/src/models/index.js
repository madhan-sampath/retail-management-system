const User = require("./User");
const Role = require("./Role");
const Product = require("./Product");
const Inventory = require("./Inventory");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Category = require("./Category");
const Supplier = require("./Supplier");
const Customer = require("./Customer");
const Payment = require("./Payment");
const Report = require("./Report");
const AuditLog = require("./AuditLog");

// Initialize models
const userModel = new User();
const roleModel = new Role();
const productModel = new Product();
const inventoryModel = new Inventory();
const orderModel = new Order();
const orderItemModel = new OrderItem();
const categoryModel = new Category();
const supplierModel = new Supplier();
const customerModel = new Customer();
const paymentModel = new Payment();
const reportModel = new Report();
const auditLogModel = new AuditLog();

console.log("✅ Local storage models initialized!");

module.exports = {
  User: userModel,
  Role: roleModel,
  Product: productModel,
  Inventory: inventoryModel,
  Order: orderModel,
  OrderItem: orderItemModel,
  Category: categoryModel,
  Supplier: supplierModel,
  Customer: customerModel,
  Payment: paymentModel,
  Report: reportModel,
  AuditLog: auditLogModel,
};
