const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const sequelize = require("../config/database");
const { Product } = require("../models");
const { Op } = require("sequelize");

// ✅ Create Order
exports.createOrder = async (req, res) => {
  try {
    const { order_type, user_id, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Order must contain at least one item" });
    }

    let totalAmount = 0;

    // Calculate total amount
    for (const item of items) {
      const product = await Product.findByPk(item.product_id);
      if (!product) return res.status(404).json({ error: `Product with ID ${item.product_id} not found` });

      totalAmount += item.quantity * product.price;
    }

    // Create Order
    const order = await Order.create({ order_type, user_id, total_amount: totalAmount });

    // Create Order Items
    for (const item of items) {
      await OrderItem.create({
        order_id: order.order_id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price
      });
    }

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get All Orders
exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.findAll({ include: OrderItem });
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // ✅ Get a single order by ID
  exports.getOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, { include: OrderItem });
  
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // ✅ Get all orders for a specific user
  exports.getOrdersByUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await Order.findAll({ where: { user_id: userId }, include: OrderItem });
  
      res.json(orders);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // ✅ Create a new order
  exports.createOrder = async (req, res) => {
    const { order_type, user_id, items } = req.body;
  
    try {
      const newOrder = await Order.create({ order_type, user_id, total_amount: 0, status: "pending" });
  
      let totalAmount = 0;
  
      for (const item of items) {
        const product = await Product.findByPk(item.product_id);
        if (!product) continue;
  
        const orderItem = await OrderItem.create({
          order_id: newOrder.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
        });
  
        totalAmount += item.quantity * item.unit_price;
  
        // ✅ Reduce stock in inventory
        product.stock_quantity -= item.quantity;
        await product.save();
      }
  
      newOrder.total_amount = totalAmount;
      await newOrder.save();
  
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // ✅ Update order status
  exports.updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      order.status = status;
      await order.save();
  
      res.json({ message: "Order status updated", order });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // ✅ Delete an order
  exports.deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
  
      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      await order.destroy();
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

// ✅ Get total sales & revenue
exports.getTotalSales = async (req, res) => {
  try {
    const totalSales = await Order.sum("total_amount");
    const totalOrders = await Order.count();

    res.json({ totalOrders, totalSales });
  } catch (error) {
    console.error("Error fetching sales report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get orders by date range
exports.getOrdersByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const orders = await Order.findAll({
      where: {
        created_at: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders by date:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
