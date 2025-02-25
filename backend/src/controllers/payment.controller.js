const Payment = require("../models/Payment");
const Order = require("../models/Order");

// ✅ Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({ include: Order });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }
};

// ✅ Get a single payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, { include: Order });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment", error });
  }
};

// ✅ Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { order_id, amount, payment_method } = req.body;

    // Ensure order exists before creating a payment
    const order = await Order.findByPk(order_id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const payment = await Payment.create({
      order_id,
      amount,
      payment_method,
    });

    res.status(201).json({ message: "Payment created successfully", payment });
  } catch (error) {
    res.status(500).json({ message: "Error creating payment", error });
  }
};

// ✅ Update a payment
exports.updatePayment = async (req, res) => {
  try {
    const { amount, payment_method } = req.body;
    const { id } = req.params;

    const payment = await Payment.findByPk(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.amount = amount;
    payment.payment_method = payment_method;
    await payment.save();

    res.json({ message: "Payment updated successfully", payment });
  } catch (error) {
    res.status(500).json({ message: "Error updating payment", error });
  }
};

// ✅ Delete a payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    await payment.destroy();
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting payment", error });
  }
};
