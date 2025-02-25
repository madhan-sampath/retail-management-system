const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./Order");
const Product = require("./Product");

const OrderItem = sequelize.define("OrderItem", {
  item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  order_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Order, key: "order_id" } 
  },
  product_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Product, key: "product_id" } 
  },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  unit_price: { type: DataTypes.FLOAT, allowNull: false }
}, {
  tableName: "Order_Items",
  timestamps: false
});

// Relationships
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

module.exports = OrderItem;
