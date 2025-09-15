const { Payment, Order } = require("../models");

// ✅ Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    // Get order details for each payment
    for (let payment of payments) {
      const order = await Order.findByPk(payment.order_id);
      payment.order = order;
    }
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }
};

// ✅ Get a single payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    
    // Get order details
    const order = await Order.findByPk(payment.order_id);
    payment.order = order;
    
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

    await Payment.update(
      { amount, payment_method },
      { where: { payment_id: id } }
    );

    const updatedPayment = await Payment.findByPk(id);
    res.json({ message: "Payment updated successfully", payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ message: "Error updating payment", error });
  }
};

// ✅ Delete a payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    await Payment.destroy({ where: { payment_id: req.params.id } });
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting payment", error });
  }
};
