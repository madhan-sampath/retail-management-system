const { Supplier } = require("../models");

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

    await Supplier.update(
      { name, contact_info, address, updated_at: new Date() },
      { where: { supplier_id: req.params.id } }
    );
    const updatedSupplier = await Supplier.findByPk(req.params.id);
    res.json({ message: "Supplier updated successfully", supplier: updatedSupplier });
  } catch (error) {
    res.status(500).json({ message: "Error updating supplier", error });
  }
};

// ✅ Delete supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });

    await Supplier.destroy({ where: { supplier_id: req.params.id } });
    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting supplier", error });
  }
};
