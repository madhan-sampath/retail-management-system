const { Product, Order, OrderItem } = require("../models");
const localStorage = require("../utils/localStorage");



// ✅ Create Order (Aligned with Table Structure)
exports.createOrder = async (req, res) => {
  try {
    const { order_type, user_id, items } = req.body;

    if (!order_type || !user_id || !items || items.length === 0) {
      return res.status(400).json({ error: "Order type, user ID, and items are required" });
    }

    let totalAmount = 0;

    try {
      // Create the order
      const order = await Order.create({
        order_type,
        user_id,
        total_amount: 0,
        status: "pending", // Default status
      });

      // Process each item in the order
      for (const item of items) {
        const product = await Product.findByPk(item.product_id);

        if (!product) {
          return res.status(404).json({ error: `Product with ID ${item.product_id} not found` });
        }

        if (item.quantity <= 0) {
          return res.status(400).json({ error: `Invalid quantity for product ID ${item.product_id}` });
        }

        if (item.quantity > product.stock_quantity) {
          return res.status(400).json({ error: `Insufficient stock for product ID ${item.product_id}` });
        }

        // Create the order item
        await OrderItem.create({
          order_id: order.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: product.price,
        });

        // Update stock quantity
        await Product.update(
          { stock_quantity: product.stock_quantity - item.quantity },
          { where: { product_id: item.product_id } }
        );

        // Update total amount
        totalAmount += item.quantity * product.price;
      }

      // Update the order with total amount
      await Order.update(
        { total_amount: totalAmount },
        { where: { order_id: order.order_id } }
      );
      res.status(201).json({
        message: "Order placed successfully",
        order: {
          order_id: order.order_id,
          order_type: order.order_type,
          user_id: order.user_id,
          total_amount: totalAmount,
          status: order.status,
          created_at: order.created_at,
          updated_at: order.updated_at,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};



// ✅ Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    // Get order items for each order
    for (let order of orders) {
      const orderItems = await OrderItem.findAll({ where: { order_id: order.order_id } });
      order.orderItems = orderItems;
    }
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
    const order = await Order.findByPk(id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Get order items for this order
    const orderItems = await OrderItem.findAll({ where: { order_id: order.order_id } });
    order.orderItems = orderItems;

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
    const orders = await Order.findAll({ where: { user_id: userId } });

    // Get order items for each order
    for (let order of orders) {
      const orderItems = await OrderItem.findAll({ where: { order_id: order.order_id } });
      order.orderItems = orderItems;
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
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

    await Order.update({ status }, { where: { order_id: id } });
    const updatedOrder = await Order.findByPk(id);

    res.json({ message: "Order status updated", order: updatedOrder });
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

    await Order.destroy({ where: { order_id: id } });
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
          [localStorage.Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders by date:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🚀 All fixed and ready to go! Let me know if you want any adjustments! 🚀
