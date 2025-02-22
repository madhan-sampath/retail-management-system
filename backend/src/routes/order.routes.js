const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// ✅ Get all orders
router.get("/", orderController.getAllOrders);

// ✅ Get a single order by ID
router.get("/:id", orderController.getOrderById);

// ✅ Get all orders for a specific user
router.get("/user/:userId", orderController.getOrdersByUser);

// ✅ Create a new order
router.post("/", orderController.createOrder);

// ✅ Update order status
router.put("/:id/status", orderController.updateOrderStatus);

// ✅ Delete an order
router.delete("/:id", orderController.deleteOrder);

// ✅ Get total sales & revenue
router.get("/reports/sales", orderController.getTotalSales);

// ✅ Get orders by date range
router.get("/filter/date", orderController.getOrdersByDate);


module.exports = router;
