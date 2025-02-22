const sequelize = require("../config/database");
const Role = require("./Role");
const Product = require("./Product");
const User = require("./user");
const Inventory = require("./Inventory");
const Order = require("./order");
const OrderItem = require("./orderItem");
const Category = require("./Category");
const Supplier = require("./Supplier");
const Customer = require("./Customer");
const Payment = require("./Payment");

// ✅ Define Role-User Relationship
Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id" });

// ✅ Define Product-Inventory Relationship
Product.hasOne(Inventory, { foreignKey: "product_id", onDelete: "CASCADE" });
Inventory.belongsTo(Product, { foreignKey: "product_id" });

// ✅ Define Order and OrderItem Relationship
Order.hasMany(OrderItem, { foreignKey: "order_id", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

// ✅ Define OrderItem-Product Relationship
Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

// ✅ Sync Database
sequelize.sync()
  .then(() => console.log("✅ Database synchronized!"))
  .catch((err) => console.error("❌ Sequelize sync error:", err));

module.exports = { sequelize, User, Role, Product, Inventory, Order, OrderItem, Category, Supplier, Customer, Payment};
