const Inventory = require("../models/Inventory");
const Product = require("../models/Product");

// ✅ Get all inventory records
exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll({ include: Product });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error });
  }
};

// ✅ Get inventory by product ID
exports.getInventoryByProductId = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      where: { product_id: req.params.productId },
      include: Product,
    });

    if (!inventory) return res.status(404).json({ message: "Inventory not found" });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error });
  }
};


exports.updateInventory = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const inventory = await Inventory.findOne({ where: { product_id: productId } });

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    inventory.quantity = quantity;
    inventory.last_updated = new Date();

    await inventory.save();

    res.json({ message: "Inventory updated successfully", inventory });
  } catch (error) {
    console.error("Error updating inventory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// ✅ Delete inventory record
exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ where: { product_id: req.params.productId } });
    if (!inventory) return res.status(404).json({ message: "Inventory not found" });

    await inventory.destroy();
    res.json({ message: "Inventory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inventory", error });
  }
};
