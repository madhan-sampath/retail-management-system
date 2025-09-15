const { Customer } = require("../models");

// ✅ Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};

// ✅ Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);y
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error });
  }
};

// ✅ Create new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const newCustomer = await Customer.create({ name, email, phone, address });
    res.status(201).json({ message: "Customer created successfully", newCustomer });
  } catch (error) {
    res.status(500).json({ message: "Error creating customer", error });
  }
};

// ✅ Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) return res.status(404).json({ message: "Customer not found" });

    await Customer.update(
      { name, email, phone, address, updated_at: new Date() },
      { where: { customer_id: req.params.id } }
    );
    const updatedCustomer = await Customer.findByPk(req.params.id);
    res.json({ message: "Customer updated successfully", customer: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error });
  }
};

// ✅ Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    await Customer.destroy({ where: { customer_id: req.params.id } });
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error });
  }
};
