const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
  order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  order_type: { type: DataTypes.ENUM("sales", "purchase"), allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  total_amount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "pending" }, // pending, completed, cancelled
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "Orders",
  timestamps: false
});

module.exports = Order;
