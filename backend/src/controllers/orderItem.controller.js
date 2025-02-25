const OrderItem = require("../models");
const Order = require("../models/Order");
const { Product } = require("../models");

// 📌 Create a new order item
exports.createOrderItem = async (req, res) => {
    try {
        const { order_id, product_id, quantity, unit_price } = req.body;

        // Validate required fields
        if (!order_id || !product_id || !quantity || !unit_price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if order exists
        const order = await Order.findByPk(order_id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Check if product exists
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Create order item
        const orderItem = await OrderItem.create({ order_id, product_id, quantity, unit_price });

        res.status(201).json({ message: "Order item created successfully", orderItem });
    } catch (error) {
        console.error("Error creating order item:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// 📌 Get all order items
exports.getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll();
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order items", error: error.message });
    }
};

// 📌 Get a single order item by ID
exports.getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) return res.status(404).json({ message: "Order item not found" });
        res.json(orderItem);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order item", error: error.message });
    }
};

// 📌 Update an order item
exports.updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, unit_price } = req.body;
        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) return res.status(404).json({ message: "Order item not found" });

        await orderItem.update({ quantity, unit_price });
        res.json(orderItem);
    } catch (error) {
        res.status(500).json({ message: "Error updating order item", error: error.message });
    }
};

// 📌 Delete an order item
exports.deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const orderItem = await OrderItem.findByPk(id);
        if (!orderItem) return res.status(404).json({ message: "Order item not found" });

        await orderItem.destroy();
        res.json({ message: "Order item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order item", error: error.message });
    }
};
