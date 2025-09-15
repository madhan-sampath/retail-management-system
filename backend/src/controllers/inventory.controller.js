const { Inventory, Product } = require("../models");

// ✅ Get all inventory records
exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    // Get product details for each inventory record
    for (let item of inventory) {
      const product = await Product.findByPk(item.product_id);
      item.product = product;
    }
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error });
  }
};

// ✅ Get inventory by product ID
exports.getInventoryByProductId = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      where: { product_id: req.params.productId }
    });

    if (!inventory) return res.status(404).json({ message: "Inventory not found" });
    
    // Get product details
    const product = await Product.findByPk(inventory.product_id);
    inventory.product = product;
    
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

    await Inventory.update(
      { quantity, last_updated: new Date() },
      { where: { product_id: productId } }
    );

    const updatedInventory = await Inventory.findOne({ where: { product_id: productId } });
    res.json({ message: "Inventory updated successfully", inventory: updatedInventory });
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

    await Inventory.destroy({ where: { product_id: req.params.productId } });
    res.json({ message: "Inventory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inventory", error });
  }
};
