const Supplier = require("../models/Supplier");

// ✅ Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suppliers", error });
  }
};

// ✅ Get supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Error fetching supplier", error });
  }
};

// ✅ Create new supplier
exports.createSupplier = async (req, res) => {
  try {
    const { name, contact_info, address } = req.body;
    const newSupplier = await Supplier.create({ name, contact_info, address });
    res.status(201).json({ message: "Supplier created successfully", newSupplier });
  } catch (error) {
    res.status(500).json({ message: "Error creating supplier", error });
  }
};

// ✅ Update supplier
exports.updateSupplier = async (req, res) => {
  try {
    const { name, contact_info, address } = req.body;
    const supplier = await Supplier.findByPk(req.params.id);

    if (!supplier) return res.status(404).json({ message: "Supplier not found" });

    supplier.name = name;
    supplier.contact_info = contact_info;
    supplier.address = address;
    supplier.updated_at = new Date();

    await supplier.save();
    res.json({ message: "Supplier updated successfully", supplier });
  } catch (error) {
    res.status(500).json({ message: "Error updating supplier", error });
  }
};

// ✅ Delete supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });

    await supplier.destroy();
    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting supplier", error });
  }
};
